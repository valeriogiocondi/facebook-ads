const PageSocialResponseDTO = require("../dto/PageSocialResponseDTO");
const PageSocialResponseBO = require("../bo/PageSocialResponseBO");

class PageSocialResponseDTOMapper {

    toDTO(bo) {

        try {

            let converter = (bo) => {

                if (Object.keys(bo).length === 0)
                    return {};
                let obj = {
                    id: bo.id,
                    internalId: bo.page_internal_id,
                    name: bo.page_name,
                    publisherPlatform: bo.publisher_platform
                    
                };
                return new PageSocialResponseDTO(obj);
            }

            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.error(err);
            throw new Error('Error occurred in PageSocialResponseDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {

        try {
            
            let converter = (dto) => {

                let obj = {
                    id: dto.id,
                    page_internal_id: dto.internalId,
                    page_name: dto.name,
                    publisherPlatform: {
                        id: dto.publisherPlatform.id,
                        value: dto.publisherPlatform.value,
                    }
                };
                return new PageSocialResponseBO(obj);
            }

            if (!Array.isArray(dto))
                return converter(dto);

            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.error(err);
            throw new Error('Error occurred in PageSocialResponseDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new PageSocialResponseDTOMapper();