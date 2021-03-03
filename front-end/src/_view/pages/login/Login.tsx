import React from 'react';
import { Redirect } from 'react-router-dom';

// MODEL
import FacebookAds from '../../../_model/types/facebook-ads-objects/facebook-ads-class';
import HttpResponse from '../../../_model/types/http-response';

// GRAPHQL RELAY
import { fetchQuery } from 'react-relay';
import environment from '../../relay/environment';
import LoginAuthQuery from '../../../_model/relay/query/LoginAuthQuery';

// SERVICES
import LoginService from '../../../services/LoginService';

// STYLE
import './Login.less';
import logo from '../../../static/images/FACEBOOK-ADS.png';


type LoginState = {
	username: string,	
	password: string,	
	redirect: boolean,
};
type LoginProps = {};

export default class Login extends React.PureComponent<LoginProps, LoginState> {

	constructor(props) {
    
		super(props);
		this.state = {
			username: "",
			password: "",
      redirect: false,
		}
	}

	componentDidMount() { 

		if (LoginService.isAuth())
			this.setState({ redirect: true })
	}
		
	setUsername = (e: Event): void => {
		this.setState({'username': e.target.value});
	};
		
	setPassword = (e: Event): void => {
		this.setState({'password': e.target.value});
	};
		
	login = async (e: Event): Promise<void> => {
		
		e.preventDefault();

		let response = await LoginService.auth(this.state.username, this.state.password);
		if (response)
			this.setState({ redirect: true });
	}
	
	renderRedirect = () => {

    if (this.state.redirect)
      return <Redirect to={{ pathname: "/" }} />;
  }
    
	render() {
		
		return (
			<React.Fragment>
				{ this.renderRedirect() }
				<div id="login" className="">
					<div className="image-intro left"></div>
					<div className="form-wrapper right">
						<header>
							<img className="logo" src={ logo } alt="Logo Sapienza"/>
							{/* <h1 className="title">Login</h1> */}
						</header>
						<section>
							<form onSubmit={this.login}>
								<div className="input-text">
									<input type="text" placeholder="E-mail" onChange={this.setUsername} />
								</div>
								<div className="input-text">
									<input type="password" placeholder="Password" onChange={this.setPassword} />
								</div>
								<div>
									<button type="submit" className="btn btn-primary"> Login </button>
								</div>
							</form>
						</section></div>
					<div className="clearfix"></div>
				</div>
			</React.Fragment>
    );
  }
}