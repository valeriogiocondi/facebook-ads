import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query LogoutQuery($token: String!) { 
        
        logout (
            token: $token
        )
    }
`;