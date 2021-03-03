require('dotenv').config();
const redux = require('../redux');
const RabbitMQ_layer = require('../rabbitMQ');
const AdsController = require('../../controller/AdsController');
const AdsRequestDTO = require('../../entities/request/dto/AdsRequestDTO');
const AdsCountRequestDTO = require('../../entities/request/dto/AdsCountRequestDTO');
const AdsSaveRequestDTO = require('../../entities/request/dto/AdsSaveRequestDTO');

module.exports = async (app) => {

    /* 
     *  REST
     *
     */
    app.get('/ads/', async (req, res) => {
    
        let response = await AdsController.getAll().then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err);
        });

        res.send(JSON.stringify(response));
    });

    app.get('/ads/id/', async (req, res) => {
    
        let requestDTO = new AdsRequestDTO({ _id: req.params.id });
        let response = await AdsController.getById(requestDTO).then((responseDTO) => {

            return responseDTO;

        }).catch((err) => { 

            console.error(err); 
        });
        
        res.send(JSON.stringify(response));
    });

    app.get('/ads/by-page-id/', async (req, res) => {
    
        let requestDTO = new AdsRequestDTO({ pageId: req.body.pageSocialInternalId });
        let response = await AdsController.getAdsBySocialPageId(requestDTO).then((responseDTO) => {

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

                case "ads.all": {

                    new Promise((resolve, reject) => {

                        AdsController.getAll().then((responseDTO) => {

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
                case "ads.id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsRequestDTO({ _id: msgRequestContent.payload.id });
                        AdsController.getById(requestDTO).then((responseDTO) => {

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
                case "ads.check": {

                    new Promise((resolve, reject) => {

                        // TODO
                        // requestDTO
                        let requestBO = msgRequestContent.payload;
                        AdsController.checkAdsListExist(requestBO).then((responseDTO) => {

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
                case "ads.save": {

                    new Promise((resolve, reject) => {

                        let requestDTO = msgRequestContent.payload.map((item) => {
                            
                            return new AdsSaveRequestDTO({

                                _id: item._id,
                                id: item.id,
                                adCreationTime: item.ad_creation_time,
                                adCreativeBody: item.ad_creative_body,
                                adCreativeLinkCaption: item.ad_creative_link_caption,
                                adCreativeLinkDescription: item.ad_creative_link_description,
                                adCreativeLinkTitle: item.ad_creative_link_title,
                                adDeliveryStartTime: item.ad_delivery_start_time,
                                adSnapshotUrl: item.ad_snapshot_url,
                                currency: item.currency,
                                fundingEntity: item.funding_entity,
                                pageId: item.page_id,
                                pageName: item.page_name,
                                impressions: item.impressions,
                                publisherPlatforms: item.publisher_platforms,
                                demographicDistribution: item.demographic_distribution,
                                regionDistribution: item.region_distribution,
                                spend: item.spend,
                                batchJobId: item.batch_job_id,
                                batchJobExecutedId: item.batch_job_executed_id,
                                created: item.created,
                            });
                        })
                        AdsController.saveAds(requestDTO).then((responseDTO) => {

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
                case "ads.by-page-id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsRequestDTO({ pageId: msgRequestContent.payload.pageInternalId });
                        AdsController.getAdsBySocialPageId(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });
                            
                        });
                        resolve();
                    });
                    break;
                }
                case "ads.by-batch-job-id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsRequestDTO(msgRequestContent.payload);

                        AdsController.getAdsByJobId(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });
                            
                        });
                        resolve();
                    });
                    break;
                }
                case "ads.count.by-batch-job-id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsCountRequestDTO(msgRequestContent.payload);
                        AdsController.countAdsByJobId(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });
                            
                        });
                        resolve();
                    });
                    break;
                }
                case "ads.by-batch-job-executed-id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsRequestDTO(msgRequestContent.payload);
                        AdsController.getAdsByJobExecutedId(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });
                            
                        });
                        resolve();
                    });
                    break;
                }
                case "ads.count.by-batch-job-executed-id": {

                    new Promise((resolve, reject) => {

                        let requestDTO = new AdsCountRequestDTO({ batchJobExecutedIdList: msgRequestContent.payload.batchJobExecutedIdList });
                        AdsController.countAdsByJobExecutedId(requestDTO).then((responseDTO) => {

                            if (msgRequestContent.replyTo) {

                                RabbitMQ_layer.replyTo(msgRequestContent.replyTo, { id: msgRequestContent.id, body: responseDTO });
                                return;
                            }
                            RabbitMQ_layer.replyTo("api_gateway_response", { id: msgRequestContent.id, body: responseDTO });
                            
                        });
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