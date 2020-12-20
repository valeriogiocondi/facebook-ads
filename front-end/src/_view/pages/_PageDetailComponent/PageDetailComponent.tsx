import React from 'react';
import { Redirect } from 'react-router-dom';

// HOC
import PageComponent from '../_PageComponent/PageComponent';

import './PageDetailComponent.less';


type PageComponentProps = { };
type PageComponentState = { };
type PageDetailComponentProps = { };
type PageDetailComponentState = { };

class PageDetailComponent<PageDetailComponentProps extends PageComponentProps, PageDetailComponentState extends PageComponentState> extends PageComponent<PageComponentProps, PageComponentState> {

	constructor(props: PageDetailComponentProps) {
		super(props);
		this.state = {};
	}

	getRenderTemplate = (Component: any, title: string) => {
		return this.getTemplate(Component, "page-detail", title);
	}
}

export default PageDetailComponent;


// type PageDetailsComponentProps = {
// 	exact: any
// 	match: any,
// 	path: string
// 	title: string
// 	queryGraphQL: any
// };
// type PageDetailsComponentState = { };

// export default class PageDetailsComponent extends React.Component<PageDetailsComponentProps, PageDetailsComponentState> { // extends PageComponent<PageComponentProps, PageComponentState> {

// 	constructor(props: PageDetailsComponentProps) {

// 		super(props);
// 		this.state = { };
// 	}

//   render() {

// 		// Auth
// 		if (!LoginService.isAuth()) return(<Redirect to={{pathname: "/login"}} />);

// 		let Component = this.props.children;
// 		const templatePageOption = {
// 			title: 					this.props.title, 
// 			queryGraphQL: 	this.props.queryGraphQL, 
// 			params: 				{ pageID: 1, pageInternalID: "153080620724" }
// 		};

// 		Component = RelayHOC(Component);
// 		Component = TemplatePageHOC(Component, templatePageOption);
	
//  	 	return (
//  	 		<React.Fragment>
// 				<div 
// 					id="main-article" 
// 					className="container"
// 				>
// 					--------
// 					{ JSON.stringify(this.props.match) }
// 					<Component />
// 				</div>
//  	 		</React.Fragment>
//     );
//   }
// }