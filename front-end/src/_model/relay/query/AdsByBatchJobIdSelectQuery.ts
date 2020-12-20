import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query AdsByBatchJobIdSelectQuery($authToken: String!, $batchJobId: ID!)  { 
    
        exportCsvAdsByBatchJobId (
            authToken: $authToken,
            batchJobId: $batchJobId
        ) {
            token
            code
            payload
        }
    }
`