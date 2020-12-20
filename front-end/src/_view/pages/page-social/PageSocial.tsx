import React from 'react';

// MODEL
import PageSocialType from '../../../_model/types/PageSocialType';

// GRAPHQL
import PageSocialSelectQueryGraphQL from '../../../_model/relay/query/PageSocialSelectQuery';

// STYLE
import './PageSocial.less';
import PageDetailComponent from '../_PageDetailComponent/PageDetailComponent';


type PageSocialProps = {
	match: any
}; 
type PageSocialState = { }; 
type PageDetailComponentProps = {};
type PageDetailComponentState = {};

class PageSocial<PageSocialProps, PageSocialState> extends PageDetailComponent<PageDetailComponentProps, PageDetailComponentState> {

	constructor(props: PageSocialProps) {
    
		super(props);
		this.state = {}
	}

	render() {

		let Component = (
			<PageSocialContent 
				queryGraphQL={ PageSocialSelectQueryGraphQL } 
				params={{ 
					pageID: this.props.match.params.id,
					pageInternalID: this.props.match.params.internalID
				}}
				body={ undefined } 
			/>
		);

		Component = this.fetchInitData(Component); 
		Component = this.getRenderTemplate(Component, "Page Social");
	
		return (
			<React.Fragment>
				{ this.isAuth(true) }
				<Component />
			</React.Fragment>
		);
  }
}


type PageSocialContentProps = {
	queryGraphQL:		any
	params: 				any	
	body: 					any	
};
type PageSocialContentState = {
	pageSocial: 		PageSocialType	
};

class PageSocialContent extends React.PureComponent<PageSocialContentProps, PageSocialContentState> {
	
	constructor(props: PageSocialContentProps) {
    
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.setState({ pageSocial: this.props?.body?.getAdsBySocialPageId?.pageSocial });
	}

	render() {
		return (
			<section id="page-social">
				{ this.props.body.getAdsBySocialPageId.token }
				{ JSON.stringify(this.state.pageSocial) }
			</section>
		);
	}
}

export default PageSocial;