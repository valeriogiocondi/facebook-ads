const BatchJobExecutedRequestDTO = require("../dto/BatchJobExecutedRequestDTO");
const BatchJobExecutedRequestBO = require("../bo/BatchJobExecutedRequestBO");

class BatchJobRequestExecutedDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id,
                batchJobId: bo.batch_job_id,
                pageSocialId: bo.page_social_id,
                byBatch: bo.by_batch,
                page: bo.page,
                limit: bo.limit,
            };

            return new BatchJobExecutedRequestDTO(obj);
        }

        if (!Array.isArray(bo))
            return converter(bo);
        
        return bo.map((item) => {

            return converter(item);
        });
    }

    toBO(dto) {

        let converter = (dto) => {
            
           let obj = {
                id: dto.id,
                batch_job_id: dto.batchJobId,
                page_social_id: dto.pageSocialId,
                by_batch: dto.byBatch,
                page: dto.page,
                limit: dto.limit,
            };

            return new BatchJobExecutedRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new BatchJobRequestExecutedDTOMapper();