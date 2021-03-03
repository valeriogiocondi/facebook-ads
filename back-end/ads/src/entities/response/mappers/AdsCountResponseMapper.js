const AdsCountResponseDTO = require("../dto/AdsCountResponseDTO");
const AdsCountResponseBO = require("../bo/AdsCountResponseBO");

class AdsCountResponseMapper {

    toDTO(bo) {
        
        try {
            
            let converter = (bo) => {

                if (Object.entries(bo).length === 0)
                    return {};

                let obj = {
                    
                    batchJobId: bo.batch_job_id,
                    batchJobExecutedId: bo.batch_job_executed_id,
                    count: bo.count,
                };
                return new AdsCountResponseDTO(obj);
            };
            
            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in AdsCountResponseMapper.toDTO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {

        try {
            
            let converter = (dto) => {

                let obj = {
                    
                    batch_job_id: dto.batchJobId,
                    batch_job_executed_id: dto.batchJobExecutedId,
                    count: dto.count,
                };
                return new AdsCountResponseBO(obj);
            };
            
            if (!Array.isArray(dto))
                return converter(dto);
            
            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
            
            console.log(err);
            throw new Error('Error occurred in AdsCountResponseMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new AdsCountResponseMapper();