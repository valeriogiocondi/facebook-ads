const AdsRequestDTO = require("../dto/AdsRequestDTO");
const AdsRequestBO = require("../bo/AdsRequestBO");

class AdsRequestMapper {

    toDTO(bo) {
        
        try {
            
            let converter = (bo) => {

                let obj = {
                    _id:                 bo._id,
                    pageId:              bo.page_id,
                    batchJobId:          bo.batch_job_id,
                    batchJobExecutedId:  bo.batch_job_executed_id,
                    page:                bo.page,
                    limit:               bo.limit,
                };
                
                return new AdsRequestDTO(obj);
            };
            
            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in AdsRequestMapper.toDTO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {

        try {
            
            let converter = (dto) => {

                let obj = {
                    _id:                    dto._id,
                    page_id:                dto.pageId,
                    batch_job_id:           dto.batchJobId,
                    batch_job_executed_id:  dto.batchJobExecutedId,
                    page:                   dto.page,
                    limit:                  dto.limit,
                };
                
                return new AdsRequestBO(obj);
            };
            
            if (!Array.isArray(dto))
                return converter(dto);
            
            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
            
            console.log(err);
            throw new Error('Error occurred in AdsRequestMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new AdsRequestMapper();