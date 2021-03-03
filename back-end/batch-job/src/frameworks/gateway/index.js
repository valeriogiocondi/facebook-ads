require('dotenv').config();
const redux = require('../redux');
const RabbitMQ_layer = require('../rabbitMQ');
const BatchJobController = require('../../controller/BatchJobController');
const BatchJobExecutedController = require('../../controller/BatchJobExecutedController');
const BatchJobRequestDTO = require('../../entities/request/dto/BatchJobRequestDTO');
const BatchJobExecutedRequestDTO = require('../../entities/request/dto/BatchJobExecutedRequestDTO');

module.exports = async (app) => {

    /* 
     *  REST
     *
     */
    app.get('/batch-job/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.body);
        let response = await BatchJobController.getAll(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err);
        });

        res.send(JSON.stringify(response));
    });

    app.get('/batch-job/batch-go/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.body);
        let response = await BatchJobController.getAllTaskList(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err);
        });

        res.send(JSON.stringify(response));
    });

    app.get('/batch-job/:id/', async (req, res) => {

        let requestDTO = new BatchJobRequestDTO({ id: req.params.id });
        let response = await BatchJobController.getById(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/batch-job/ads/:id/page/:page/limit/:limit/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.params);
        let response = await BatchJobController.getAdsByJobId(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/batch-job/ads/:pageInternalId/export-csv/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.params);
        let response = await BatchJobController.adsExportCSV(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });
    
    app.post('/batch-job/insert/', async (req, res) => {

        let requestDTO = new BatchJobRequestDTO(req.body);
        let response = await BatchJobController.insert(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });
    
    app.put('/batch-job/edit/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.body);
        let response = await BatchJobController.edit(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });
    
    app.delete('/batch-job/delete/', async (req, res) => {
    
        let requestDTO = new BatchJobRequestDTO(req.body);
        let response = await BatchJobController.delete(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    
    });
    
    app.get('/batch-job-executed/', async (req, res) => {

        let requestDTO = new BatchJobExecutedRequestDTO(req.body);
        let response = await BatchJobExecutedController.getAll(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        // res.send(JSON.stringify(response));
    });
    
    app.get('/batch-job-executed/:id/', async (req, res) => {
    
        let requestDTO = new BatchJobExecutedRequestDTO({ id: req.params.id });
        let response = await BatchJobExecutedController.getById(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/batch-job-executed/ads/:id/page/:page/limit/:limit/', async (req, res) => {
    
        let requestDTO = new BatchJobExecutedRequestDTO(req.params);
        let response = await BatchJobExecutedController.getAdsByJobExecutedId(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/batch-job-executed/by-batch-job/:id', async (req, res) => {
    
        let requestDTO = new BatchJobExecutedRequestDTO({ batchJobId: req.params.id });
        let response = await BatchJobExecutedController.getByBatchJobId(requestDTO).then((responseDTO) => {

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

                case "batch-job.executed.save": {

                    new Promise((resolve, reject) => {


                        let requestDTO = new BatchJobExecutedRequestDTO(msgRequestContent.payload);
                        BatchJobExecutedController.insert(requestDTO).then((responseDTO) => {

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
                default: {
                    
                    break;
                }
            }
        }

    }, {
        noAck: true
    });                      
};