const PageSocialRequestDTO = require("../dto/PageSocialRequestDTO");
const PageSocialRequestBO = require("../bo/PageSocialRequestBO");

class PageSocialRequestDTOMapper {

    toDTO(bo) {

        try {
            
            let converter = (bo) => {

                let obj = {
                    id: bo.id,
                    pageIdList: bo.page_id_list,
                    pageInternalId: bo.page_internal_id,
                    pageName: bo.page_name,
                    publisherPlatformId: bo.publisher_platform_id,
                    page: bo.page,
                    limit: bo.limit,
                };
                return new PageSocialRequestDTO(obj);
            }

            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in PageSocialRequestDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }

    toBO(dto) {

        try { 

            let converter = (dto) => {
                
            let obj = {
                    id: dto.id,
                    page_id_list: dto.pageIdList,
                    page_internal_id: dto.pageInternalId,
                    page_name: dto.pageName,
                    publisher_platform_id: dto.publisherPlatformId,
                    page: dto.page,
                    limit: dto.limit,
                };
                return new PageSocialRequestBO(obj);
            }

            if (!Array.isArray(dto))
                return converter(dto);

            return dto.map((item) => {

                return converter(item);
            });
            
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in PageSocialRequestDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new PageSocialRequestDTOMapper();