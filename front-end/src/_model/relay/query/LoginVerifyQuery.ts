import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query LoginVerifyQuery($token: String!) { 
        
        loginVerify (
            token: $token
        )
    }
`;