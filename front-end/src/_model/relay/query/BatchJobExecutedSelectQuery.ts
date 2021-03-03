import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobExecutedSelectQuery($authToken: String!, $id: ID!) {
        
      getBatchJobExecutedById(authToken: $authToken, id: $id) {

            token
            batchJobExecuted {
                id
                batchJob {
                    id
                    pageSocial {
                        id
                        internalId
                        name
                        publisherPlatform {
                            idPublisherPlatform
                            valuePublisherPlatform
                        }
                    }
                }
                byBatch
                numAds
                created
            }
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