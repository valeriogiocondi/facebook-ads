import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query BatchJobExecutedListSelectQuery($authToken: String!, $limit: Int, $page: Int) {
        
        getBatchJobExecutedList(authToken: $authToken, limit: $limit, page: $page) {

            token
            batchJobExecutedList {
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
        }        
    }
`