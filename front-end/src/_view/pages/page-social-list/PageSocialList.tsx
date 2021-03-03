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
import PageListComponent from '../_Class/_PageListComponent/PageListComponent';
import TableList from  '../../components/TableList/TableList';

// STYLE
import './PageSocialList.less';
import { Description } from '@material-ui/icons';


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
	queryGraphQL: 	any
	params: 				any
	body: 					any
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

	render() {
		return (
			<section id="page-social-list">
				<div className="custom-table">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th className="text-center">Ads</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.pageSocialList?.map((item: PageSocialType) => {
										
									if (!item) return <></>;

									return (
										<tr>
											<td>
												<div className="foreground">{ item.name }</div>
												<div className="background internal-id">{ item.internalId }</div>
											</td>
											<td className="num-ads text-center">33.000</td>
											<td className="social">
												<div>
													<a 
														className="link"
														href={ socialUtils.getLinkSocialPlatform(item.publisherPlatform.idPublisherPlatform, item.internalId) }
														target="_blank"
													>
														View on social
													</a>
												</div>
												<div className="background">
													{ item.publisherPlatform.valuePublisherPlatform }
												</div>
											</td>
											<td>
												<div>Last update</div>
												<div className="background">08/01/2021</div>
											</td>
											<td style={{ textAlign: "right" }}>
												<button 
													className="btn export-csv"
													onClick={() => this.getCSV(item.internalId)}
												>
													Export CSV
												</button>
												<a 
													className="button view-details"
													href={`page-social/${item.id}/${item.internalId}`}
												>
													View
												</a>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
 			</section>
		);
	}
}

export default PageSocialList;