import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
    query LoginAuthQuery($username: String!, $password: String!) { 
        
        loginAuth (
            username: $username,
            password: $password
        )
    }
`;