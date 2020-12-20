import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    mutation BatchJobInsertQuery($params: BatchJobInput!) {

        insertBatchJob(params: $params) {
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
`