import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query AdsSelectQuery($adsId: ID!) { 
        
        adsById(id: $adsId) {
            _id,
            id,
            adCreationTime, 
            adCreativeBody, 
            adCreativeLinkCaption, 
            adCreativeLinkDescription, 
            adCreativeLinkTitle, 
            adDeliveryStartTime, 
            adSnapshotUrl, 
            currency, 
            fundingEntity, 
            pageId, 
            pageName, 
            impressions {
                lowerBound,
                upperBound,
            }, 
            publisherPlatforms, 
            demographicDistribution {
                percentage, 
                age, 
                gender,
            }, 
            spend {
                lowerBound,
                upperBound,
            }, 
            created,
        }
    }
`