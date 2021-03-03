import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query PageSocialSelectQuery ($authToken: String!, $pageID: ID!, $pageInternalID: ID!) {
    
        getPageSocial (authToken: $authToken, id: $pageID, internalID: $pageInternalID) {

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
            numAds
            adsList {
                _id
                id
                adCreationTime
                adCreativeBody
                adCreativeLinkCaption
                adCreativeLinkDescription
                adCreativeLinkTitle
                adDeliveryStartTime
                adSnapshotUrl
                currency
                publisherPlatforms
                spend {
                    lowerBound
                    upperBound
                }
                created
            }
        }
    }
`