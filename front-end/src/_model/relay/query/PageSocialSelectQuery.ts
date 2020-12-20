import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query PageSocialSelectQuery ($authToken: String!, $pageID: ID!, $pageInternalID: ID!) {
    
        getAdsBySocialPageId (authToken: $authToken, id: $pageID, internalID: $pageInternalID) {

            token
            pageSocial {
                id
                internalId
                name
                publisherPlatform {
                    idPublisherPlatform
                    valuePublisherPlatform
                }
            }
            ads {
                _id,
                id,
                adCreationTime 
                adCreativeBody 
                adCreativeLinkCaption 
                adCreativeLinkDescription 
                adCreativeLinkTitle 
                adDeliveryStartTime 
                adSnapshotUrl 
                currency 
                fundingEntity, 
                pageId, 
                pageName, 
                publisherPlatforms
                created,
            }
        }
    }
`