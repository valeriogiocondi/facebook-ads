/* 
 *
 *  This element is just a wrapper to incapsulate all GraphQL logic, we have here:
 * 
 *      - Environment     
 *      - QueryRenderer     
 * 
 * 
 *  This element get ReactElememt as child, pass graphQL query result, and return it.
 *  
 * 
 *  Only this element will be compilated, not affecting JSX page in src/_view
 * 
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

// SERVICE
import loginService from '../../services/LoginService';

// GRAPHQL
import { QueryRenderer } from 'react-relay';
import environment from './environment';

// PAGES
import ErrorLoading from '../pages/error/error-loading/ErrorLoading';
import Loading from '../pages/loading/Loading';


type RelayRendererProps = {
	query: any,
	params: any,
}

export default class RelayRenderer extends React.PureComponent<RelayRendererProps, {}> {

	constructor(props: RelayRendererProps) {
    
		super(props);
		this.state = {}
    }
    
    setToken = (params: any) => {
        /* 
         *  Passing JWT token to GraphQL
         */

        return { 
            authToken: localStorage.getItem('authToken'),
            ...params
        };
    }
     
    render() {
        
        /* 
         *  React Node - content of the page
         *  We'll pass to it the GraphQL response
         *
         */
        let childNode = this.props.children;

        return (
            <React.Fragment>
                <QueryRenderer
                    environment={ environment }
                    query={ this.props.query }
                    variables={ this.setToken(this.props.params) }
                    render={({ error, props }) => {

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
                            loginService.refreshToken(token);

                            /* 
                             *  To pass props to a child we have to use React.cloneElement()
                             */
                            let childJSXWithProps = React.cloneElement(childNode, {body: props});
                        
                            return <React.Fragment> {childJSXWithProps} </React.Fragment> ;

                        } else {
                            
                            return <Loading />;
                        }
                    }}
                />

            </React.Fragment>
        );
            
    }
}