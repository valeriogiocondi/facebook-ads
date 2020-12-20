const AdsAdReachedCountriesRequestBO = require("../request/bo/AdsAdReachedCountriesRequestBO");
const AdsAdReachedCountriesResponseDTO = require("../response/dto/AdsAdReachedCountriesResponseDTO");

class AdsAdReachedCountriesDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id,
                value: bo.value,
            };
            return new AdsAdReachedCountriesResponseDTO(obj);
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
            return new AdsAdReachedCountriesRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new AdsAdReachedCountriesDTOMapper();