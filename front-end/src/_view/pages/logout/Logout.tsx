import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

// SERVICES
import LoginService from '../../../services/LoginService';

// STYLE
import './Logout.less';


type LoginState = {
	redirect: boolean,
};

export default class Logout extends React.PureComponent<{}, LoginState> {

	constructor(props) {
    
		super(props);
		this.state = {
      redirect: false,
		}
	}

	componentDidMount() { 

		LoginService.logout();
		this.setState({ redirect: true })
	}
		
	renderRedirect = () => {

    if (this.state.redirect)
      return <Redirect to={{ pathname: "/login" }} />;
  }
    
	render() {
		
		return (
			<Fragment>
				{ this.renderRedirect() }
				<div id="logout" className="container">
					Logout...
				</div>
			</Fragment>
    );
  }
}