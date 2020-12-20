import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query AdsBySocialPageIdSelectQuery($authToken: String!, $pageInternalId: String!) { 
        
        exportCsvAdsBySocialPageId (
            authToken: $authToken,
            pageInternalId: $pageInternalId
        ) {
            token
            code
            payload
        }
    }
`;