const AdsSaveRequestDTO = require("../dto/AdsSaveRequestDTO");
const AdsSaveRequestBO = require("../bo/AdsSaveRequestBO");

class AdsRequestMapper {

    toDTO(bo) {
        
        try {
            
            let converter = (bo) => {

                let obj = {
                    _id:                        bo._id,
                    id:                         bo.id,
                    adCreationTime:             bo.ad_creation_time,
                    adCreativeBody:             bo.ad_creative_body,
                    adCreativeLinkCaption:      bo.ad_creative_link_caption,
                    adCreativeLinkDescription:  bo.ad_creative_link_description,
                    adCreativeLinkTitle:        bo.ad_creative_link_title,
                    adDeliveryStartTime:        bo.ad_delivery_start_time,
                    adSnapshotUrl:              bo.ad_snapshot_url,
                    currency:                   bo.currency,
                    fundingEntity:              bo.funding_entity,
                    pageId:                     bo.page_id,
                    pageName:                   bo.page_name,
                    impressions:                bo.impressions,
                    publisherPlatforms:         bo.publisher_platforms,
                    demographicDistribution:    bo.demographic_distribution,
                    regionDistribution:         bo.region_distribution,
                    spend:                      bo.spend,
                    batchJobId:                 bo.batch_job_id,
                    batchJobExecutedId:         bo.batch_job_executed_id,
                    created:                    bo.created,
                };
                
                return new AdsSaveRequestDTO(obj);
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
                    _id:                           dto._id,
                    id:                            dto.id,
                    ad_creation_time:              dto.adCreationTime,
                    ad_creative_body:              dto.adCreativeBody,
                    ad_creative_link_caption:      dto.adCreativeLinkCaption,
                    ad_creative_link_description:  dto.adCreativeLinkDescription,
                    ad_creative_link_title:        dto.adCreativeLinkTitle,
                    ad_delivery_start_time:        dto.adDeliveryStartTime,
                    ad_snapshot_url:               dto.adSnapshotUrl,
                    currency:                      dto.currency,
                    funding_entity:                dto.fundingEntity,
                    page_id:                       dto.pageId,
                    page_name:                     dto.pageName,
                    impressions:                   dto.impressions,
                    publisher_platforms:           dto.publisherPlatforms,
                    demographic_distribution:      dto.demographicDistribution,
                    region_distribution:           dto.regionDistribution,
                    spend:                         dto.spend,
                    batch_job_id:                  dto.batchJobId,
                    batch_job_executed_id:         dto.batchJobExecutedId,
                    created:                       dto.created,
                };
                
                return new AdsSaveRequestBO(obj);
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