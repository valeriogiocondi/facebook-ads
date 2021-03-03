import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobListSelectQuery ($authToken: String!, $limit: Int!, $page: Int!) {
    
        getBatchJobList (authToken: $authToken, limit: $limit, page: $page) {
            
            token
            batchJobList {
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
                numAds
                created
            }
        }
    }
`