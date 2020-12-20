const BatchJobRequestDTO = require("../dto/BatchJobRequestDTO");
const BatchJobRequestBO = require("../bo/BatchJobRequestBO");

class BatchJobRequestDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id, 
                pageId: bo.page_id, 
                pageInternalId: bo.page_internal_id, 
                publisherPlatformId: bo.publisher_platform_id, 
                adActiveStatus: bo.ad_active_status, 
                adReachedCountries: bo.ad_reached_countries, 
                adType: bo.ad_type, 
                impressionCondition: bo.impression_condition, 
                searchTerms: bo.search_terms, 
                time: bo.time,
                created: bo.created,
                page: bo.page,
                limit: bo.limit,
            };
            return new BatchJobRequestDTO(obj);
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
                page_social_id: dto.pageSocialId, 
                page_internal_id: dto.pageInternalId, 
                publisher_platform_id: dto.publisherPlatformId, 
                ad_active_status: dto.adActiveStatus, 
                ad_reached_countries: dto.adReachedCountries, 
                ad_type: dto.adType, 
                impression_condition: dto.impressionCondition, 
                search_terms: dto.searchTerms, 
                time: dto.time,
                created: dto.created,
                page: dto.page,
                limit: dto.limit,
            };
            return new BatchJobRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new BatchJobRequestDTOMapper();