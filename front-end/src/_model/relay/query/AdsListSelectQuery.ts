import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query AdsListSelectQuery($authToken: String!, $limit: Int, $page: Int) { 
        
        adsList(
            authToken: $authToken,
            limit: $limit,
            page: $page
        ) {
            token
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
                fundingEntity
                pageId
                pageName
            }
        }
    }
`