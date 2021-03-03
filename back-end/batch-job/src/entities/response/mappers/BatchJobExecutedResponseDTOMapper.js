const BatchJobExecutedResponseDTO = require("../dto/BatchJobExecutedResponseDTO");
const BatchJobExecutedResponseBO = require("../bo/BatchJobExecutedResponseBO");

class BatchJobExecutedResponseDTOMapper {

    toDTO(bo) {

        try {
            
            let converter = (bo) => {
                
                let obj = {
                    id: bo.id,
                    batchJob: {
                        id: bo.batch_job_id,
                        pageSocial: {
                            id: bo.page_social_id,
                        },
                    },
                    byBatch: bo.by_batch,
                    created: bo.date_create,
                };

                return new BatchJobExecutedResponseDTO(obj);
            };
            
            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.error(err);
            throw new Error('Error occurred in BatchJobExecutedResponseDTOMapper.toDTO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {
        
        try {
            
            let converter = (dto) => {

                let obj = {
                    id: dto.id,
                    batch_job: dto.batchJob,
                    by_batch: dto.byBatch,
                    date_create: dto.created,
                };
    
                return new BatchJobExecutedResponseBO(obj);
            };
            
            if (!Array.isArray(dto))
                return converter(dto);
            
            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
            
            console.error(err);
            throw new Error('Error occurred in BatchJobExecutedResponseDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new BatchJobExecutedResponseDTOMapper();