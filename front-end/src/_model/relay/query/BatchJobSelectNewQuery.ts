import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobSelectNewQuery($authToken: String!) { 
    
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