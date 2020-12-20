import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobSelectEditQuery($authToken: String!, $params: BatchJobInput!) { 
    
        getBatchJobById(authToken: $authToken, params: $params) {
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