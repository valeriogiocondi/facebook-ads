const AdsCountRequestDTO = require("../dto/AdsCountRequestDTO");
const AdsCountRequestBO = require("../bo/AdsCountRequestBO");

class AdsCountRequestMapper {

    toDTO(bo) {
        
        try {
            
            let converter = (bo) => {

                let obj = {
                    batchJobIdList: bo.batch_job_id_list,
                    batchJobExecutedIdList: bo.batch_job_executed_id_list,
                };
                
                return new AdsCountRequestDTO(obj);
            };
            
            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in AdsCountRequestMapper.toDTO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {

        try {
            
            let converter = (dto) => {

                let obj = {
                    batch_job_id_list: dto.batchJobIdList,
                    batch_job_executed_id_list: dto.batchJobExecutedIdList,
                };
                
                return new AdsCountRequestBO(obj);
            };
            
            if (!Array.isArray(dto))
                return converter(dto);
            
            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
            
            console.log(err);
            throw new Error('Error occurred in AdsCountRequestMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new AdsCountRequestMapper();