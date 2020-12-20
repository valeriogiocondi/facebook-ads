import React from 'react';

// MODEL
import PageSocialType from '../../../_model/types/PageSocialType';

// MISCELLANEOUS
import { exportCSV, socialUtils } from '../../../miscellaneous/';

// GRAPHQL
import { fetchQuery } from 'relay-runtime';
import environment from '../../relay/environment';
import PageSocialListSelectQueryGraphQL from '../../../_model/relay/query/PageSocialListSelectQuery';
import AdsBySocialPageIdSelectQueryGraphQL from '../../../_model/relay/query/AdsBySocialPageIdSelectQuery';

// STYLE
import './PageSocialList.less';

// COMPONENTS
import PageListComponent from '../_PageListComponent/PageListComponent';
import TableList from  '../../components/TableList/TableList';

// STYLE
import './PageSocialList.less';


type PageSocialListProps = {
	match: any
}; 
type PageSocialListState = {}; 
type PageListComponentProps = {};
type PageListComponentState = {};

class PageSocialList<PageSocialListProps, PageSocialListState> extends PageListComponent<PageListComponentProps, PageListComponentState> {

	constructor(props: PageSocialListProps) {
    
		super(props);
		this.state = {}
	}

	render() {

		let Component = (
			<PageSocialListContent 
				queryGraphQL={ PageSocialListSelectQueryGraphQL } 
				params={{ limit: 10, page: 1 }}
				body={ undefined } 
			/>
		);

		Component = this.fetchInitData(Component); 
		Component = this.getRenderTemplate(Component, "Page Social List");
	
		return (
			<React.Fragment>
				{ this.isAuth(true) }
				<Component />
			</React.Fragment>
		);
  }
}


type PageSocialListContentProps = {
	queryGraphQL: 			any
	params: 						any
	body: 							any
};
type PageSocialListContentState = {
	pageSocialList?: 		Array<PageSocialType>	
};

class PageSocialListContent extends React.Component<PageSocialListContentProps, PageSocialListContentState> {
	
	constructor(props: PageSocialListContentProps) {
    
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.setState({ pageSocialList: this.props?.body?.getPageSocialList?.pageSocialList });
	}

	getCSV = (pageSocialInternalId: string) => {

		const variables = {
			authToken: 			localStorage.getItem('authToken'),
			pageInternalId: pageSocialInternalId,
		};

		fetchQuery(environment, AdsBySocialPageIdSelectQueryGraphQL, variables)
			.then((data: any) => {

				switch (data.exportCsvAdsBySocialPageId.code) {

					case 200: {

						exportCSV("ads-list-" + pageSocialInternalId + ".csv", data.exportCsvAdsBySocialPageId.payload);
						break;
					}
					case 404: {

						alert("Non sono presenti Ads per questa pagina");
						break;
					}
					default: {

						break;
					}
				}

			}).catch((err) => {

				console.log(err);
			});
	}

	private serializeData = (): any => {

		let data: any[] = [];

		data = this.state.pageSocialList?.map((item: PageSocialType) => {
		
			if (!item) return {};

			return {
				"id": 								item.id,
				"internalId": 				socialUtils.getLinkSocialPlatform(item.publisherPlatform.idPublisherPlatform, item.internalId), 
				"name": 							item.name, 
				"publisherPlatform": 	item.publisherPlatform.valuePublisherPlatform, 
				"view": 							<a href={`page-social/${item.id}/${item.internalId}`}>View</a>, 
				"exportCSV": 					<button onClick={() => this.getCSV(item.internalId)}>Export CSV</button>,
			};
		});

		return {
			"header": ["ID", "Social ID", "Name", "Platform", "", ""],
			"content": data
		};
	}

	render() {
		return (
			<section id="page-social-list">
 				<TableList 
 					data={ this.serializeData() }
 					// TODO
 					// calculate total element - just data.length

 					// totalElement={ this.serializeData().content.length }
 					numElementPage={ 10 }
 				/>
 			</section>
		);
	}
}

export default PageSocialList;