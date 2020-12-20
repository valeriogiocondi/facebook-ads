import React, { ComponentClass } from 'react';
import { Redirect } from 'react-router-dom';

// GRAPHQL
import { QueryRenderer } from 'react-relay';
import environment from '../../relay/environment';
import { fetchQuery } from 'relay-runtime';

// PAGES
import ErrorLoading from '../../pages/error/error-loading/ErrorLoading';
import Loading from '../../pages/loading/Loading';

// SERVICES
import LoginService from '../../../services/LoginService';


export default (Component): any => {

  /* 
   *  Passing JWT token to GraphQL
   */
  const setToken = (params: any) => {

    return { 
      authToken: localStorage.getItem('authToken'),
      ...params
    };
  }

  return class extends React.Component<{}, {}> {

    render() {
      return (
        <React.Fragment>
          <QueryRenderer
            environment={ environment }
            query={ Component.props.queryGraphQL }
            variables={ setToken(Component.props.params) }
            render={
              ({ error, props }) => {
  
                if (error)
                    return (
                        <ErrorLoading description={ error.toString() } />
                    );
                    
                if (props) {
  
                    // alert(JSON.stringify(props));
                    
                    let token = Object.values(props)[0].token;
  
                    if (!token) {
  
                        // Refresh Token has expired
                        return <Redirect to={{ pathname: "/login" }} />;
                    }
  
                    // SAVE NEW TOKEN
                    LoginService.refreshToken(token);
  
                    /* 
                    *  To pass props to a child we have to use React.cloneElement()
                    */
                    return <React.Fragment>{ React.cloneElement(Component, { body: props }) }</React.Fragment>
  
                } else {
                  return <Loading />;
                }
              }
            }
          />
        </React.Fragment>
      );
    }
  };

};