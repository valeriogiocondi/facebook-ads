const AdsImpressionConditionRequestBO = require("../request/bo/AdsImpressionConditionRequestBO");
const AdsImpressionConditionResponseDTO = require("../response/dto/AdsImpressionConditionResponseDTO");

class AdsImpressionConditionDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id,
                value: bo.value,
            };
            return new AdsImpressionConditionResponseDTO(obj);
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
            return new AdsImpressionConditionRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new AdsImpressionConditionDTOMapper();