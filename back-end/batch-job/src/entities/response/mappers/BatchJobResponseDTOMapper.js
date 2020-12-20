const BatchJobResponseDTO = require("../dto/BatchJobResponseDTO");
const BatchJobResponseBO = require("../bo/BatchJobResponseBO");

class BatchJobResponseDTOMapper {

    toDTO(bo) {

        try {
            
            let converter = (bo) => {

                if (Object.keys(bo).length === 0)
                    return {};

                let obj = {
                    id: bo.id,
                    // pageSocial: {
                    //     id: bo.page_social.id,
                    //     name: bo.page_social.name,
                    //     internalId: bo.page_social.internal_id,
                    //     publisherPlatform: {
                    //         idPublisherPlatform: bo.page_social.publisher_platform.id,
                    //         valuePublisherPlatform: bo.page_social.publisher_platform.value,
                    //     }
                    // },
                    pageSocial: bo.page_social,
                    adActiveStatus: bo.ad_active_status,
                    adReachedCountries: bo.ad_reached_countries,
                    adType: bo.ad_type,
                    impressionCondition: bo.impression_condition,
                    searchTerms: bo.search_terms,
                    time: bo.time,
                    created: bo.created,   
                };
                return new BatchJobResponseDTO(obj);
            }

            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
                
            } catch (err) {
                    
                console.log(err);
                throw new Error('Error occurred in BatchJobResponseDTOMapper.toBO(): ' + JSON.stringify(err));
            }
    }

    toBO(dto) {
        
        try {

            let converter = (dto) => {
                
            let obj = {
                    id: dto.id,
                    page_internal_id: dto.pageInternalId,
                    page_social_id: dto.pageSocialId,
                    publisher_platform_id: dto.publisherPlatformId,
                    ad_active_status: dto.adActiveStatus,
                    ad_reached_countries: dto.adReachedCountries,
                    ad_type: dto.adType,
                    impression_condition: dto.impressionCondition,
                    search_terms: dto.searchTerms,
                    time: dto.time,
                    created: dto.created,
                };
                return new BatchJobResponseBO(obj);
            }

            if (!Array.isArray(dto))
                return converter(dto);

            return dto.map((item) => {

                return converter(item);
            });
                
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in BatchJobResponseDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new BatchJobResponseDTOMapper();