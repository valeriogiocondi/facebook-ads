const AdsAdTypeRequestBO = require("../request/bo/AdsAdTypeRequestBO");
const AdsAdTypeResponseDTO = require("../response/dto/AdsAdTypeResponseDTO");

class AdsAdTypeDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id,
                value: bo.value,
            };
            return new AdsAdTypeResponseDTO(obj);
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
            return new AdsAdTypeRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new AdsAdTypeDTOMapper();