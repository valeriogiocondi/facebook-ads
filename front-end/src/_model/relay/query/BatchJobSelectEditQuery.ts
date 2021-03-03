import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobSelectEditQuery($authToken: String!, $id: ID!) { 
    
        getBatchJobById(authToken: $authToken, id: $id) {
            token
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
                adActiveStatus
                adReachedCountries
                adType
                impressionCondition
                searchTerms
                time
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
        getActiveStatusList(authToken: $authToken) {
            token
            activeStatusList {
                idActiveStatus
                valueActiveStatus
            }
        }
        getReachedCountriesList(authToken: $authToken) {
            token
            reachedCountriesList {
                idReachedCountries
                valueReachedCountries
            }
        }
        getTypeList(authToken: $authToken) {
            token
            typeList {
                idType
                valueType
            }
        }
        getImpressionConditionList(authToken: $authToken) {
            token
            impressionConditionList {
                idImpressionCondition
                valueImpressionCondition
            }
        }
        getPublisherPlatformList(authToken: $authToken) {
            token
            publisherPlatformList {
                idPublisherPlatform
                valuePublisherPlatform
            }
        }
    }
`