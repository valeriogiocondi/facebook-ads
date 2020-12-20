const AdsAdActiveStatusRequestBO = require("../request/bo/AdsAdActiveStatusRequestBO");
const AdsAdActiveStatusResponseDTO = require("../response/dto/AdsAdActiveStatusResponseDTO");

class AdsAdActiveStatusDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id,
                value: bo.value,
            };
            return new AdsAdActiveStatusResponseDTO(obj);
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
                value: dto.value,
            };
            return new AdsAdActiveStatusRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new AdsAdActiveStatusDTOMapper();