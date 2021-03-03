const RabbitMQ_layer = require('../frameworks/rabbitMQ');
const BatchJobExecutedUseCase = require('../application/use_cases/BatchJobExecutedUseCase');
const BatchJobExecutedRequestDTOMapper = require('../entities/request/mappers/BatchJobExecutedRequestDTOMapper');
const BatchJobExecutedResponseDTOMapper = require('../entities/response/mappers/BatchJobExecutedResponseDTOMapper');
const BatchJobController = require('./BatchJobController');

class BatchJobExecutedController {
    
    async getAll(requestDTO) {
        
        let requestBO = BatchJobExecutedRequestDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getAll(requestBO).then( async (resultBO) => {

            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobExecutedResponseDTO = BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

            // RabbitMQ - get pageSocial
            let requestPageSocial = batchJobExecutedResponseDTO; 
            if (Array.isArray(batchJobExecutedResponseDTO))
            requestPageSocial = Array.from( new Set( batchJobExecutedResponseDTO.map(batchExecuted => batchExecuted.batchJob.pageSocial.id) ) );
            
            let responsePageSocial = await RabbitMQ_layer.joinWith("page-social.all", { body: { pageIdList: requestPageSocial } } );
            
            // RabbitMQ - get countAds
            // let requestCountAds = batchJobExecutedResponseDTO.map(batch => batch.id);
            // let responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-batch-job-executed-id", { body: { batchJobExecutedIdList: requestCountAds } } );
            
            // mapping result
            batchJobExecutedResponseDTO = batchJobExecutedResponseDTO.map((batchExecuted) => {

                batchExecuted.batchJob.pageSocial = responsePageSocial.payload.filter((pageSocial) => {
                    
                    if (batchExecuted.batchJob.pageSocial.id == pageSocial.id)
                        return pageSocial;
                })[0];

                batchExecuted.numAds = 123;
                // batchExecuted.numAds = responseCountAds.payload.filter((res) => {
                    
                //     return (res.batchJobExecutedId === batchExecuted.id)
                // })[0].count;
                
                return batchExecuted;
            });
            console.log(batchJobExecutedResponseDTO)

        
            return batchJobExecutedResponseDTO;

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getAll(): ' + JSON.stringify(err));
        });
    }

    async getById(requestDTO) {

        let requestBO = BatchJobExecutedRequestDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getById(requestBO).then( async (resultBO) => {

            let batchJobExecutedResponseDTO = BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

            if (batchJobExecutedResponseDTO && Object.keys(batchJobExecutedResponseDTO).length !== 0) {

                const batchJobResult = await BatchJobController.getById({ id: batchJobExecutedResponseDTO.batchJob.id });

                const requestCountAds = { batchJobExecutedIdList: [requestDTO.id] };
                const responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-batch-job-executed-id", { body: requestCountAds } );
                
                batchJobExecutedResponseDTO.numAds = responseCountAds.payload.count;
                batchJobExecutedResponseDTO.batchJob = {
                    id: batchJobResult.id,
                    pageSocial: batchJobResult.pageSocial,
                };

                return batchJobExecutedResponseDTO;
            }

            return {};

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getById(): ' + JSON.stringify(err));
        });
    }

    async getAdsByJobExecutedId(requestDTO) {        
    
        const requestAds = { 
            batchJobExecutedId: requestDTO.id,
            limit: requestDTO.limit,
            page: requestDTO.page,
        };
        return (
            await RabbitMQ_layer.joinWith("ads.by-batch-job-executed-id", { body: requestAds } )
        ).payload;
    }

    async getByBatchJobId(requestDTO) {
        
        let requestBO = BatchJobExecutedRequestDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getByBatchJobId(requestBO).then( async (resultBO) => {

            let batchJobExecutedResponseDTO = BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

            if (batchJobExecutedResponseDTO && Object.keys(batchJobExecutedResponseDTO).length !== 0) {

                // RabbitMQ - get countAds
                const requestCountAds = { id: batchJobExecutedResponseDTO[0].batchJob.id };
                const responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-batch-job-executed-id", { body: requestCountAds } );

                // mapping result
                batchJobExecutedResponseDTO = batchJobExecutedResponseDTO.map((batch) => {

                    batch.numAds = responseCountAds.payload.count;
                    batch.batchJob = {
                        id: requestDTO.id,
                    };
                    return batch;
                });
                
                return batchJobExecutedResponseDTO;
            }

            return {};

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getById(): ' + JSON.stringify(err));
        });
    }

    async getAdsByJob(requestDTO) {

        /* 
         * TODO
         * Use RabbitMQ
         */
        
        // let requestBO = BatchJobExecutedRequestDTOMapper.toBO(requestDTO);

        // return BatchJobExecutedUseCase.getAdsByJob(requestBO).then((resultBO) => {
             
        //     return BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

        // }, (err) => {
            
        //     throw new Error('Error occurred in BatchJobExecutedController.getAdsByJobExecuted(): ' + JSON.stringify(err));
        // });
    }

    async countAdsByJob(requestDTO) {
        
        /* 
         * TODO
         * Use RabbitMQ
         */
    }

    async insert(requestDTO) {

        let requestBO = BatchJobExecutedRequestDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.insert(requestBO).then((resultBO) => {
            
            return BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.insert(): ' + JSON.stringify(err));
        });
    }
    
};

module.exports = new BatchJobExecutedController();