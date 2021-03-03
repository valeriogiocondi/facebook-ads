import React from 'react';
import { Link } from 'react-router-dom';

// MODEL
import BatchJobType from '../../../_model/types/BatchJobType';

// GRAPHQL
import { commitMutation, fetchQuery } from 'relay-runtime';
import environment from '../../relay/environment';
import BatchJobListSelectQueryGraphQL from '../../../_model/relay/query/BatchJobListSelectQuery';
import AdsByBatchJobIdSelectQueryGraphQL from '../../../_model/relay/query/AdsByBatchJobIdSelectQuery';
import BatchJobListDeleteQueryGraphQL from '../../../_model/relay/mutation/BatchJobListDeleteQuery';

// MISCELLANEOUS
import config from '../../../config'
import { exportCSV, socialUtils } from '../../../miscellaneous/';

// SERVICES
import RestService from '../../../services/RestService';

// COMPONENTS
import PageListComponent from '../_Class/_PageListComponent/PageListComponent';
import TableList from  '../../components/TableList/TableList';

// STYLE
import './BatchJobList.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faEye,
} from '@fortawesome/free-solid-svg-icons'


type BatchJobListProps = {
	match: any
}; 
type BatchJobListState = { }; 
type PageListComponentProps = {};
type PageListComponentState = {};

class BatchJobList<BatchJobListProps, BatchJobListState> extends PageListComponent<PageListComponentProps, PageListComponentState> {

	constructor(props: BatchJobListProps) {
    
		super(props);
		this.state = {}
	}

	render() {

		let Component = (
			<BatchJobListContent 
				queryGraphQL={ BatchJobListSelectQueryGraphQL } 
				params={{ limit: 10, page: 1 }}
				body={ undefined } 
			/>
		);

		Component = this.fetchInitData(Component); 
		Component = this.getRenderTemplate(Component, "Batch Job List");
	
		return (
			<React.Fragment>
				{ this.isAuth(true) }
				<Component />
			</React.Fragment>
		);
  }
}


type BatchJobListContentProps = {
	queryGraphQL: 		any
	params:						any
	body: 						any
};
type BatchJobListContentState = {
	batchJobList?: 		Array<BatchJobType>
};

class BatchJobListContent extends React.Component<BatchJobListContentProps, BatchJobListContentState> {
	
	constructor(props: BatchJobListContentProps) {
    
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.setState({ batchJobList: this.props.body.getBatchJobList?.batchJobList });
	}

	private fetchData = (job: any): void => {
		
		/* 
		*	Call API di FB
		*	
		*	http://127.0.0.1:3000/api/facebook-api
		*
		* 	https://www.facebook.com/ads/library/api/
		* 	
		*
		* 	TODO	
		*	Handle pagination by link at the end
		*/

		let data = {
			batch_job_id: 					job.id,
			page_social_id: 				job.pageSocial.id,
			search_page_ids: 				job.pageSocial.internalId,
			publisher_platforms: 		job.pageSocial.publisherPlatform.idPublisherPlatform,
			ad_active_status: 			job.adActiveStatus,
			ad_reached_countries: 	job.adReachedCountries,
			ad_type: 								job.adType,
			impression_condition: 	job.impressionCondition,
			search_terms: 					job.searchTerms,
			by_batch: 							0,
		};

		RestService.get(config.endpoints.facebookAPI, data).then((result) => {

			// TODO
			// POPUP AVVENUTA CONFERMA
			
			alert(JSON.stringify(result));
			// this.setState({result: result});
		});
	}

	private delete(id: number): void {
		
		if (window.confirm("Are you sure?")) {

			/* 
			* 	TODO	
			*	request DTO
			*
			*/
			let data = {id: id};

			/* 
			*	TODO
			*	Incapsulate inside class
			*/
			commitMutation(
				environment,
				{
					mutation: BatchJobListDeleteQueryGraphQL,
					variables: { params: data },
					onCompleted: (response) => { 

						// TODO
						// it's a SPA, get id and use data-binding
						window.location.reload();
					}
				}
			);
		}
	}
	
	getCSV = (batchJobId: number, pageSocialInternalId: string) => {

		const variables = {
			authToken: 		localStorage.getItem('authToken'),
			batchJobId: 	batchJobId,
		};

		fetchQuery(environment, AdsByBatchJobIdSelectQueryGraphQL, variables)
			.then((data: any) => {

				switch (data.exportCsvAdsByBatchJobId.code) {

					case 200: {

						exportCSV("ads-list-" + pageSocialInternalId + "-by-batch-" + batchJobId + ".csv", data.exportCsvAdsByBatchJobId.payload);
						break;
					}
					case 404: {

						alert("Non sono presenti Ads per questo job");
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
	
	getJobsExecuted = (limit: number, page: number): void => {

		// TODO
		// Use GraphQL Pagination
		alert('getJobExecuted: ' + limit + " - " + page);
	}

	render() {
		return (
			<section id="batch-job-list">
				<div className="custom-table">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th className="text-center">Ads</th>
								<th>Time</th>
								<th className="text-center">Keywords</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.batchJobList?.map((item: BatchJobType) => {
										
									if (!item) return <></>;

									return (
										<tr>
											<td>
												<div className="foreground">{ item.pageSocial.name }</div>
												<div className="background internal-id">{ item.pageSocial.internalId }</div>
											</td>
											<td className="num-ads text-center">
												{ item.numAds }
											</td>
											<td>
												<div>{ item.time }</div>
												<div className="background">Every day</div>
											</td>
											<td className="search-keywords text-center">
												{ (item.searchTerms) ? item.searchTerms : "--" }
											</td>
											<td className="text-right">
												<button 
													className="btn export-csv"
													onClick={() => this.fetchData(item)}
												>
													GET DATA
												</button>
											</td>
											<td className="text-right">
												<button 
													className="btn export-csv"
													onClick={() => this.getCSV(item.id, item.pageSocial.internalId)}
												>
													Export CSV
												</button>
												<a 
													className="button view-details"
													href={`/batch-job/view/${item.id}`}
												>
													View / Edit
												</a>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				{/* 
 				<TableList 
 					data={ this.serializeData() }
 					// TODO
 					// calculate total element - just data.length

 					// totalElement={ this.serializeData().content.length }
 					numElementPage={ 10 }
				 />
				  */}
 			</section>
		);
	}
}

export default BatchJobList;