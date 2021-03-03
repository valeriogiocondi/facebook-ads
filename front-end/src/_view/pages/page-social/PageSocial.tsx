import React from 'react';

// MODEL
import PageSocialType from '../../../_model/types/PageSocialType';

// MISCELLANEOUS
import socialUtils from '../../../miscellaneous/social-utils/social-utils';

// GRAPHQL
import PageSocialSelectQueryGraphQL from '../../../_model/relay/query/PageSocialSelectQuery';

// STYLE
import './PageSocial.less';

import PageDetailComponent from '../_Class/_PageDetailComponent/PageDetailComponent';
import AdsListTable from '../../components/AdsListTable/AdsListTable';



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
		Component = this.getRenderTemplate(Component, "");
	
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
		this.state = {
			pageSocial: null
		};
	}

	componentWillMount() {
		this.setState({

			pageSocial: { 
				...this.props?.body?.getPageSocial?.pageSocial,
				adsList: this.props?.body?.getPageSocial?.adsList,
			}
		});
	}

	render() {

		const hrefSocial = 
			socialUtils.getLinkSocialPlatform(
				this.state.pageSocial.publisherPlatform.idPublisherPlatform, 
				this.state.pageSocial.internalId
			);

		return (
			<div id="page-social">
				<header>
					{/* <div>{ this.state.pageSocial.internalId }</div> */}
					<div>
						<div className="label">Name: </div>
						<div className="value">{ this.state.pageSocial.name }</div>
					</div>
					<div>
						<div className="label">Social Platform: </div>
						<div className="value">{ this.state.pageSocial.publisherPlatform.valuePublisherPlatform }</div>
					</div>
					<div>
						<div className="label">Total Ads: </div>
						<div className="value">{ this.state.pageSocial.numAds ?? 0 }</div>
					</div>
					<div>
						<a 
							className="link"
							href={ hrefSocial }
							target="_blank"
						>
							View on { this.state.pageSocial.publisherPlatform.valuePublisherPlatform }
						</a>
					</div>
				</header>
				<section>
					<AdsListTable 
						adsList={ this.state.pageSocial.adsList }
					/>
				</section>
			</div>
		);
	}
}

export default PageSocial;