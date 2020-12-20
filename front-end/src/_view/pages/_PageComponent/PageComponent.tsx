import React from 'react';
import { Redirect } from 'react-router-dom';

// HOC
import RelayHOC from '../../hocs/relay';
import TemplatePageListHOC from '../../hocs/template-page-list';
import TemplatePageDetailsHOC from '../../hocs/template-page-details';

// SERVICES
import LoginService from '../../../services/LoginService';
import RestService from '../../../services/RestService';

import './PageComponent.less';


type PageComponentProps = { };
type PageComponentState = { };

class PageComponent<T extends PageComponentProps, S extends PageComponentState> extends React.Component<T, S> {

	constructor(props: T) {

		super(props);
	}

	isAuth = (isPrivate: boolean): any => {
		
		if (isPrivate)
			return (!LoginService.isAuth()) ? <Redirect to={{pathname: "/login"}} /> : <></>;
	}

	fetchInitData = (Component: any): any => {
	
		return RelayHOC(Component); 
	}

	fetchData = (endpoint: string, data: any) => {

		RestService.get(endpoint, data).then((result) => {

			return result;

			// TODO
			// POPUP AVVENUTA CONFERMA
			
			// alert(JSON.stringify(result));
			// this.setState({result: result});
		});
	}

	getTemplate = (Component: any, templateName: string, title: string): any => {
	
		switch (templateName) {

			case "page-list": {
				return TemplatePageListHOC(Component, title);
			}
			case "page-detail": {
				return TemplatePageDetailsHOC(Component, title);
			}
			default: {
				console.log("No template found!")
				return null;
			}
		}
	}
}

export default PageComponent;