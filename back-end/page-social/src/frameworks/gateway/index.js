require('dotenv').config();
const redux = require('../redux');
const RabbitMQ_layer = require('../rabbitMQ');
const PageSocialController = require('../../controller/PageSocialController');
const PageSocialRequestDTO = require('../../entities/request/dto/PageSocialRequestDTO');

const gateway = (app) => {

    /* 
     *  REST
     *
     */
    app.get('/page-social/', async (req, res) => {

        console.log(req.body)
    
        let requestDTO = new PageSocialRequestDTO(req.body);
        let response = await PageSocialController.getAll(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err);
        });

        console.log(response);
        res.send(JSON.stringify(response));
    });

    app.get('/page-social/:id/', async (req, res) => {

        let requestDTO = new PageSocialRequestDTO({ id: req.params.id });
        let response = await PageSocialController.getById(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/page-social/ads/:internalID/', async (req, res) => {
    
        let requestDTO = new PageSocialRequestDTO({ pageInternalId: req.params.internalID });
        let response = await PageSocialController.getAdsBySocialPageId(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/page-social/ads/:pageInternalId/export-csv/', async (req, res) => {
    
        let requestDTO = new PageSocialRequestDTO(req.params);
        let response = await PageSocialController.adsExportCSV(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });


    /* 
     *  RabbitMQ
     *
     */
    const rabbitMQ = redux.getState().saveRabbitObj;

    rabbitMQ.channel.consume(rabbitMQ.queue, (msgRequest) => {

        if (msgRequest.content) {

            console.log("Message arrived: " + msgRequest.content);

            let msgRequestContent = JSON.parse(msgRequest.content.toString());

            switch (msgRequest.fields.routingKey) {

                case "page-social.all": {

                    new Promise((resolve, reject) => {

                        let requestDTO = [];

                        // GET BY ID LIST
                        if (msgRequestContent.payload.length > 0) {

                            requestDTO = msgRequestContent.payload.map((item) => {

                                return new PageSocialRequestDTO({ id: item });
                            });
                        }
                        
                        PageSocialController.getAll(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });

                        }).catch((err) => { console.error(err) });
                        
                        resolve();
                    });
                    break;
                }
                case "page-social.id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new PageSocialRequestDTO({ id: msgRequestContent.payload.id });
                        PageSocialController.getById(requestDTO).then((responseDTO) => {

                            let queue = (msgRequestContent.replyTo) ? msgRequestContent.replyTo : "api_gateway_response";
                            RabbitMQ_layer.replyTo(queue, { id: msgRequestContent.id, body: responseDTO });

                        }).catch((err) => { console.error(err) });
                        
                        resolve();
                    });
                    break;
                }
                case "page-social.page-id": {

                    new Promise((resolve, reject) => {
                        
                        let requestDTO = new PageSocialRequestDTO({ 
                            pageInternalId: msgRequestContent.payload.pageInternalId, 
                            publisherPlatformId: msgRequestContent.payload.publisherPlatformId, 
                        });
                        PageSocialController.getByPageId(requestDTO).then((responseDTO) => {

                            let queue = (msgRequestContent.replyTo) ? msgRequestContent.replyTo : "api_gateway_response";
                            RabbitMQ_layer.replyTo(queue, { id: msgRequestContent.id, body: responseDTO });

                        }).catch((err) => { console.error(err) });
                        
                        resolve();
                    });
                    break;
                }
                case "page-social.insert": {

                    new Promise((resolve, reject) => {
                        
                        let requestDTO = new PageSocialRequestDTO({ 
                            pageInternalId: msgRequestContent.payload.pageInternalId,
                            pageName: msgRequestContent.payload.pageName,
                            publisherPlatformId: msgRequestContent.payload.publisherPlatformId,
                        });
                        PageSocialController.insert(requestDTO).then((responseDTO) => {

                            let queue = (msgRequestContent.replyTo) ? msgRequestContent.replyTo : "api_gateway_response";

                            RabbitMQ_layer.replyTo(queue, { id: msgRequestContent.id, body: responseDTO });

                        }).catch((err) => { console.error(err) });
                        
                        resolve();
                    });
                    break;
                }
                default: {
                    
                    break;
                }
            }
        }

    }, {
        noAck: true
    });
    

};

module.exports = gateway;