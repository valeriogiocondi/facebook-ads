import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query PageSocialListSelectQuery ($authToken: String!, $limit: Int!, $page: Int!) {
    
        getPageSocialList (authToken: $authToken, limit: $limit, page: $page) {

            token
            pageSocialList {
                id
                internalId
                name
                publisherPlatform {
                    idPublisherPlatform
                    valuePublisherPlatform
                }
            }
        }
    }
`