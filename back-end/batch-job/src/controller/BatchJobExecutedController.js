const RabbitMQ_layer = require('../frameworks/rabbitMQ');
const BatchJobExecutedUseCase = require('../application/use_cases/BatchJobExecutedUseCase');
const BatchJobRequestExecutedDTOMapper = require('../entities/request/mappers/BatchJobRequestExecutedDTOMapper');
const BatchJobExecutedResponseDTOMapper = require('../entities/response/mappers/BatchJobExecutedResponseDTOMapper');

class BatchJobExecutedController {
    
    async getAll(requestDTO) {
        
        let requestBO = BatchJobRequestExecutedDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getAll(requestBO).then( async (resultBO) => {
            
            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobExecutedResponseDTO = BatchJobExecutedResponseDTOMapper.toDTO(resultBO);
            
            let messageBody = batchJobExecutedResponseDTO; 
            if (Array.isArray(batchJobExecutedResponseDTO))
                messageBody = new Set( batchJobExecutedResponseDTO.map(item => item.pageSocial) );

            let responseMessage = await RabbitMQ_layer.joinWith("page-social.all", { body: messageBody } );

            // mapping result
            if (!Array.isArray(batchJobExecutedResponseDTO))
                batchJobExecutedResponseDTO.pageSocial = responseMessage.payload;
            else {
                batchJobExecutedResponseDTO = batchJobExecutedResponseDTO.map((batch) => {

                    batch.batchJob.pageSocial = responseMessage.payload.filter((pageSocial) => {
                        
                        if (batch.batchJob.pageSocial.id == pageSocial.id)
                            return pageSocial;
                    })[0];

                    return batch;
                });
            }
            
            return batchJobExecutedResponseDTO;

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getAll(): ' + JSON.stringify(err));
        });
    }

    async getByJobId(requestDTO) {
        
        let requestBO = BatchJobRequestExecutedDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getByJobId(requestBO).then( async (resultBO) => {

            // RabbitMQ will get a PageSocial DTO
            // Then we get BatchJob DTO earlier, in order to join 'em
            let batchJobExecutedResponseDTO = BatchJobExecutedResponseDTOMapper.toDTO(resultBO);
            
            if (batchJobExecutedResponseDTO && Object.keys(batchJobExecutedResponseDTO).length !== 0) {

                let request = { id: batchJobExecutedResponseDTO[0].pageSocial };
                let responseMessage = await RabbitMQ_layer.joinWith("page-social.id", { body: request } );

                // mapping result
                if (!Array.isArray(batchJobExecutedResponseDTO))
                    batchJobExecutedResponseDTO.pageSocial = responseMessage.payload;
                else {
                    batchJobExecutedResponseDTO = batchJobExecutedResponseDTO.map((batch) => {

                        batch.pageSocial = responseMessage.payload;
                        return batch;
                    });
                }
                return batchJobExecutedResponseDTO;
            }

            return {};

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getById(): ' + JSON.stringify(err));
        });
    }

    async getAdsByJob(requestDTO) {
        
        let requestBO = BatchJobRequestExecutedDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.getAdsByJob(requestBO).then((resultBO) => {
             
            return BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.getAdsByJobExecuted(): ' + JSON.stringify(err));
        });
    }

    async insert(requestDTO) {

        let requestBO = BatchJobRequestExecutedDTOMapper.toBO(requestDTO);

        return BatchJobExecutedUseCase.insert(requestBO).then((resultBO) => {
            
            return BatchJobExecutedResponseDTOMapper.toDTO(resultBO);

        }, (err) => {
            
            throw new Error('Error occurred in BatchJobExecutedController.insert(): ' + JSON.stringify(err));
        });
    }
    
};

module.exports = new BatchJobExecutedController();