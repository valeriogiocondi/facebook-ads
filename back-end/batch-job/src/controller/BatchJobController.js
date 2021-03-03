const RabbitMQ_layer = require('../frameworks/rabbitMQ');
const exportCSV = require('../miscellaneous/export-csv');
const BatchJobUseCase = require('../application/use_cases/BatchJobUseCase');
const BatchJobRequestDTOMapper = require('../entities/request/mappers/BatchJobRequestDTOMapper');
const BatchJobResponseDTOMapper = require('../entities/response/mappers/BatchJobResponseDTOMapper');

class BatchJobController {
    
    async getAll(requestDTO) {

        let requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);

        return BatchJobUseCase.getAll(requestBO).then(async (resultBO) => {

            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobResponseDTO = BatchJobResponseDTOMapper.toDTO(resultBO);

            // RabbitMQ - get pageSocial
            let requestPageSocial = batchJobResponseDTO; 
            if (Array.isArray(batchJobResponseDTO))
            requestPageSocial = Array.from( new Set( batchJobResponseDTO.map(batch => batch.pageSocial.id) ) );

            let responsePageSocial = await RabbitMQ_layer.joinWith("page-social.all", { body: { pageIdList: requestPageSocial } } );
            
            // RabbitMQ - get countAds
            let requestCountAds = batchJobResponseDTO.map(batch => batch.id);
            let responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-batch-job-id", { body: { batchJobIdList: requestCountAds } } );
            
            // mapping result
            batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                batch.pageSocial = responsePageSocial.payload.filter((pageSocial) => {
                    
                    if (batch.pageSocial == pageSocial.id)
                        return pageSocial;
                })[0];

                batch.numAds = responseCountAds.payload.filter((res) => {
                    
                    return (res.batchJobId === batch.id)
                })[0].count;
                
                return batch;
            });
        
            return batchJobResponseDTO;

        }, (err) => {
            
            throw err;
        });
    }
    
    async getAllTaskList(requestDTO) {

        let requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);

        return BatchJobUseCase.getAll(requestBO).then(async (resultBO) => {

            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobResponseDTO = BatchJobResponseDTOMapper.toDTO(resultBO);
            let responseMessage;
            /* 
             *  GET PAGE SOCIAL
             */
            let messageBody = batchJobResponseDTO; 
            if (Array.isArray(batchJobResponseDTO))
                messageBody = new Set( batchJobResponseDTO.map(item => item.pageSocial) );

            responseMessage = await RabbitMQ_layer.joinWith("page-social.all", { body: { pageIdList: messageBody} } );

            // mapping result
            if (!Array.isArray(batchJobResponseDTO))
                batchJobResponseDTO.pageSocial = responseMessage.payload;
            else {
                batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                    batch.pageSocial = responseMessage.payload.filter((pageSocial) => {
                        
                        if (batch.pageSocial == pageSocial.id)
                            return pageSocial;
                    })[0];

                    return batch;
                });
            }

            /* 
             *  get-active-status
             */
            responseMessage = await RabbitMQ_layer.joinWith("facebook-api.get-active-status", {});
            // mapping result
            if (!Array.isArray(batchJobResponseDTO))
                batchJobResponseDTO.adActiveStatus = responseMessage.payload[batchJobResponseDTO.adActiveStatus].valueActiveStatus;
            else {
                batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                    batch.adActiveStatus = responseMessage.payload[batch.adActiveStatus].valueActiveStatus;
                    return batch;
                });
            }
            
            /* 
             *  get-reached-countries
             */
            responseMessage = await RabbitMQ_layer.joinWith("facebook-api.get-reached-countries", {});

            // mapping result
            if (!Array.isArray(batchJobResponseDTO))
                batchJobResponseDTO.adReachedCountries = responseMessage.payload[batchJobResponseDTO.adReachedCountries].valueReachedCountries;
            else {
                batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                    batch.adReachedCountries = responseMessage.payload[batch.adReachedCountries].valueReachedCountries;
                    return batch;
                });
            }
            
            /* 
             *  get-type
             */
            responseMessage = await RabbitMQ_layer.joinWith("facebook-api.get-type", {});

            // mapping result
            if (!Array.isArray(batchJobResponseDTO))
                batchJobResponseDTO.adType = responseMessage.payload[batchJobResponseDTO.adType].valueType;
            else {
                batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                    batch.adType = responseMessage.payload[batch.adType].valueType;
                    return batch;
                });
            }
            
            /* 
             *  get-impression-condition
             */
            responseMessage = await RabbitMQ_layer.joinWith("facebook-api.get-impression-condition", {});

            // mapping result
            if (!Array.isArray(batchJobResponseDTO))
                batchJobResponseDTO.impressionCondition = responseMessage.payload[batchJobResponseDTO.impressionCondition].valueImpressionCondition;
            else {
                batchJobResponseDTO = batchJobResponseDTO.map((batch) => {

                    batch.impressionCondition = responseMessage.payload[batch.impressionCondition].valueImpressionCondition;
                    return batch;
                });
            }
            
            return batchJobResponseDTO;

        }, (err) => {
            
            throw err;
        });
    }

    async getById(requestDTO) {
        
        let requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);
        
        return BatchJobUseCase.getById(requestBO).then( async (resultBO) => {

            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobResponseDTO = BatchJobResponseDTOMapper.toDTO(resultBO);

            if (batchJobResponseDTO && Object.keys(batchJobResponseDTO).length !== 0) {

                // RabbitMQ - get pageSocial
                let requestPageSocial = { id: batchJobResponseDTO.pageSocial };
                let responsePageSocial = await RabbitMQ_layer.joinWith("page-social.id", { body: requestPageSocial } );

                // RabbitMQ - get countAds
                // const requestCountAds = { id: batchJobResponseDTO.id };
                // const responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-batch-job-id", { body: requestCountAds } );

                // batchJobResponseDTO.numAds = responseCountAds.payload.count;
                batchJobResponseDTO.pageSocial = responsePageSocial.payload;
                return batchJobResponseDTO;
            }

            return {};

        }, (err) => {
            
            throw err;
        });
    }

    async getAdsByJobId(requestDTO) {        
    
        const requestAds = { 
            batchJobId: requestDTO.id,
            limit: requestDTO.limit,
            page: requestDTO.page,
        };
        return (
            await RabbitMQ_layer.joinWith("ads.by-batch-job-id", { body: requestAds } )
        ).payload;
    }
    
    async insert(requestDTO) {

        /* 
        *  Check if the page already exists and return id
        *
        *  If not exists, take the name from Facebook and insert it
        */
       
        let requestBO;
        let getPageSocialId = async (requestDTO) => {

            let pageSocialId;
            let pageSocialRequestDTO;

            pageSocialRequestDTO = {
                pageInternalId: requestDTO.pageInternalId,
                pageName: "",
                publisherPlatformId: requestDTO.publisherPlatformId,
                adReachedCountries: requestDTO.adReachedCountries,
            };

            // TODO 
            // Use message broker

            /* 
            *  GET page social by id, to check if the page already exists
            *
            */
            
            pageSocialId = await new Promise(async (resolve, reject) => {

                let responseMessage = await RabbitMQ_layer.joinWith("page-social.page-id", { body: pageSocialRequestDTO } );

                if (Object.keys(responseMessage.payload).length === 0)
                    resolve(null);

                resolve(responseMessage.payload.id);
            
            }).then((result) => {

                console.log(result);
                return result;

            }).catch((err) => {
                
                console.error(err);
            });

            console.log("page id is " + pageSocialId)

            /* 
            *  IF PAGE NOT EXIST - INSERT NEW ONE
            *
            */
            if (!pageSocialId) {
                
                pageSocialId = await new Promise(async (resolve, reject) => {

                    // GET PAGE NAME FROM FACEBOOK-API
                    pageSocialRequestDTO.pageName = await new Promise( async (resolve, reject) => {

                        let responseMessage = await RabbitMQ_layer.joinWith("facebook-api.get-page-name", { body: pageSocialRequestDTO } );
                        resolve(responseMessage.payload);
                    });
                    
                    if (pageSocialRequestDTO.pageName) {

                        // INSERT PAGE
                        let responseMessage = await RabbitMQ_layer.joinWith("page-social.insert", { body: pageSocialRequestDTO } );
                        resolve(responseMessage.payload.id);
                    }
                });
            }

            return pageSocialId;
        }

        /* 
         * INSERT BATCH JOB
         *
         */

        requestDTO.pageSocialId = await getPageSocialId(requestDTO);
        requestDTO.time = (requestDTO.time) ? requestDTO.time : "00:00";

        if (requestDTO.pageSocialId) {

            requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);
            
            return BatchJobUseCase.insert(requestBO).then((responseBO) => {
                
                return BatchJobResponseDTOMapper.toDTO(responseBO);
    
            }, (err) => {
                
                throw new Error('Error occurred in BatchJobController.insert(): ' + JSON.stringify(err));
            });

            // TODO
            // Handle response ok
            return {};
        }

        // TODO
        // Handle error

        return {};
    }
    
    async edit(requestDTO) {

        console.log(requestDTO);

        let requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);
        
        return BatchJobUseCase.edit(requestBO).then((responseBO) => {

            console.log(responseBO);
            
            return BatchJobResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobController.edit(): ' + JSON.stringify(err));
        });
    }

    async delete(requestDTO) {

        let requestBO = BatchJobRequestDTOMapper.toBO(requestDTO);

        return BatchJobUseCase.delete(requestBO).then((responseBO) => {
            
            return BatchJobResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobController.delete(): ' + JSON.stringify(err));
        });
    }

    async adsExportCSV(requestDTO) {
        
        let responseMessage = await RabbitMQ_layer.joinWith("ads.by-batch-job-id", { body: requestDTO } );

        console.log(responseMessage);

        return exportCSV(responseMessage.payload);
    }
};

module.exports = new BatchJobController();