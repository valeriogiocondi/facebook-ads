require('dotenv').config();
const redux = require('../redux');
const RabbitMQ_layer = require('../rabbitMQ');
const FacebookApiController = require('../../controller/FacebookApiController');

module.exports = (app) => {

    /* 
     *  REST
     *
     */

    app.get('/facebook-api/', (req, res) => {
    
        console.log("/facebook-api/");

        let response = "facebook-api";
        res.send(JSON.stringify(response));
    });
    
    app.put('/facebook-api/get-ads/', (req, res) => {
    
        console.log("/facebook-api/get-ads/");

        console.log(req.body)

        // let requestDTO = new BatchJobRequestDTO(req.body);
        let response = FacebookApiController.getAdsList(req.body);
        res.send(JSON.stringify(response));
    });

    app.get('/facebook-api/active-status/', (req, res) => {
    
        let response = FacebookApiController.getActiveStatus();
        res.send(JSON.stringify(response));
    });
    
    app.get('/facebook-api/reached-countries/', (req, res) => {
    
        let response = FacebookApiController.getReachedCountries();
        res.send(JSON.stringify(response));
    });
    
    app.get('/facebook-api/type/', (req, res) => {
    
        let response = FacebookApiController.getType();
        res.send(JSON.stringify(response));
    });
    
    app.get('/facebook-api/impression-condition/', (req, res) => {
    
        let response = FacebookApiController.getImpressionCondition();
        res.send(JSON.stringify(response));
    });
    
    app.get('/facebook-api/publisher-platform/', (req, res) => {
    
        let response = FacebookApiController.getPublisherPlatform();
        res.send(JSON.stringify(response));
    });

    /* 
     *  RabbitMQ
     *  
     */
    const rabbitMQ = redux.getState().saveRabbitObj;

    console.log("exchange: " + rabbitMQ.exchange);
    
    rabbitMQ.channel.consume(rabbitMQ.queue, (msgRequest) => {
    
        if (msgRequest.content) {

            console.log("Message arrived: " + msgRequest.content);
            
            let msgRequestContent = JSON.parse(msgRequest.content.toString());

            switch (msgRequest.fields.routingKey) {

                case "facebook-api.get-ads": {

                    /* 
                    *  Fetch data from Facebook API 
                    *
                    *  EXAMPLE $params:
                    *
                    *  { 
                    *      search_page_ids: '153080620724',
                    *      publisher_platforms: '0',
                    *      ad_active_status: '1',
                    *      ad_reached_countries: '2',
                    *      ad_type: '3',
                    *      impression_condition: '0',
                    *      batch_job_id: '1',
                    *  }
                    */

                    new Promise(async (resolve, reject) => {

                        await FacebookApiController.getAdsList(msgRequestContent.payload).then((result) => {

                            // console.log(result);

                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: result } );

                        }).catch((err) => { 

                            console.error(err);
                            reject();
                        });
                        
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-page-name": {

                    new Promise((resolve, reject) => {

                        let requestDTO = msgRequestContent.payload;
                        FacebookApiController.getPageName(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                                return;
                            }

                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO } );

                        }).catch((err) => { console.error(err) });
                        
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-active-status": {

                    new Promise((resolve, reject) => {

                        const responseDTO = FacebookApiController.getActiveStatus();

                        if (msgRequestContent.replyTo) {

                            RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                            return;
                        }
                        resolve();
                        
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-reached-countries": {

                    new Promise((resolve, reject) => {

                        const responseDTO = FacebookApiController.getReachedCountries();

                        if (msgRequestContent.replyTo) {

                            RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                            return;
                        }

                        RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO } );
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-type": {

                    new Promise((resolve, reject) => {

                        const responseDTO = FacebookApiController.getType();

                        if (msgRequestContent.replyTo) {

                            RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                            return;
                        }

                        RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO } );
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-impression-condition": {

                    new Promise((resolve, reject) => {

                        const responseDTO = FacebookApiController.getImpressionCondition();

                        if (msgRequestContent.replyTo) {

                            RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                            return;
                        }

                        RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO } );
                        resolve();
                    });
                    break;
                }
                case "facebook-api.get-publisher-platform": {

                    new Promise((resolve, reject) => {

                        const responseDTO = FacebookApiController.getPublisherPlatform();

                        if (msgRequestContent.replyTo) {

                            RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO } );
                            return;
                        }

                        RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO } );
                        resolve();
                    });
                    break;
                }

                default: {
                    
                    break;
                }
            }
        }

    }, 
    {
        noAck: true
    });

    
    // amqp.connect(rabbitMQ.url, (error0, connection) => {
        
    //     if (error0) {
    //         throw error0;
    //     }

    //     connection.createChannel((error1, channel) => {
            
    //         if (error1) {
    //             throw error1;
    //         }

    //         console.log("channel created");
    //         rabbitMQ.channel = channel;

    //         channel.assertExchange(rabbitMQ.exchange, "topic", {durable: true}, (error2, ex) => {

    //             if (error2) {
    //                 throw error2;
    //             }

    //             console.log("Exchange: " + JSON.stringify(ex))

    //             channel.assertQueue(rabbitMQ.queue, {durable: true}, (error3, q) => {

    //                 if (error3) {
    //                     throw error3;
    //                 }

    //                 console.log("Waiting for messages in " + JSON.stringify(q));

    //                 try {
                        
    //                     /* 
    //                     *  Binding exchange to queue
    //                     *  Routing messages with $routingKey, from $exchange to $queue
    //                     *
    //                     */
    //                     channel.bindQueue(q.queue, rabbitMQ.exchange, rabbitMQ.routingKey);
    
    //                     /* 
    //                     *  After binding exchange to queue, we have to wait for new messages
    //                     *
    //                     */
    //                     channel.consume(q.queue, (msgRequest) => {
    
    //                         if (msgRequest.content) {

    //                             console.log("Message arrived: " + msgRequest.content);
                                
    //                             let msgRequestContent = JSON.parse(msgRequest.content.toString());
    //                             let rabbit = {
    //                                 channel: rabbitMQ.channel,
    //                                 exchange: rabbitMQ.exchange,
    //                                 queue: rabbitMQ.queue,
    //                             };
        
    //                             switch (msgRequest.fields.routingKey) {

    //                                 case "facebook-api.get-ads": {
        
    //                                     /* 
    //                                     *  Fetch data from Facebook API 
    //                                     *
    //                                     *  EXAMPLE $params:
    //                                     *
    //                                     *  { 
    //                                     *      search_page_ids: '153080620724',
    //                                     *      publisher_platforms: '0',
    //                                     *      ad_active_status: '1',
    //                                     *      ad_reached_countries: '2',
    //                                     *      ad_type: '3',
    //                                     *      impression_condition: '0',
    //                                     *      batch_job_id: '1',
    //                                     *  }
    //                                     */
  
    //                                     new Promise((resolve, reject) => {
  
    //                                         FacebookApiController.getAdsList(rabbit, msgRequestContent.payload).then((result) => {
  
    //                                             RabbitMQ_layer.replyTo(
    //                                                 { id: msgRequestContent.id, body: result },
    //                                                 "api_gateway_response",
    //                                                 { channel: channel }
    //                                             );
  
    //                                         }).catch((err) => { 

    //                                             console.error(err);
    //                                             reject();
    //                                         });
                                            
    //                                         resolve();
    //                                     });
    //                                     break;
    //                                 }
    //                                 case "facebook-api.get-page-name": {
        
    //                                     new Promise((resolve, reject) => {
  
    //                                         let requestDTO = { pageInternalId: msgRequestContent.payload };
    //                                         FacebookApiController.getPageName(requestDTO).then((result) => {
  
    //                                             if (msgRequestContent.replyTo) {

    //                                                 RabbitMQ_layer.replyTo(
    //                                                     { id: msgRequestContent.id, body: responseDTO },
    //                                                     msgRequestContent.replyTo,
    //                                                     { channel: rabbitMQ.channel }
    //                                                 );
    //                                                 return;
    //                                             }

    //                                             RabbitMQ_layer.replyTo(
    //                                                 { id: msgRequestContent.id, body: responseDTO },
    //                                                 "api_gateway_response",
    //                                                 { channel: rabbitMQ.channel }
    //                                             );
  
    //                                         }).catch((err) => { console.error(err) });
                                            
    //                                         resolve();
    //                                     });
    //                                     break;
    //                                 }

    //                                 default: {
                                        
    //                                     break;
    //                                 }
    //                             }
    //                         }
    
    //                     }, {
    //                         noAck: true
    //                     });
                        
    //                 } catch (error) {
    
    //                     throw error
    //                 }
    //             });

    //         });
    //     });
    // });
};