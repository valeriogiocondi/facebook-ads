import React from 'react';

// MODEL
import BatchJobExecutedType from '../../../_model/types/BatchJobExecutedType';

// GRAPHQL
import { commitMutation } from 'react-relay';
import environment from '../../relay/environment';
import BatchJobExecutedListSelectQueryGraphQL from '../../../_model/relay/query/BatchJobExecutedListSelectQuery';
import BatchJobExecutedListSelectMutationGraphQL from '../../../_model/relay/mutation/BatchJobExecutedListSelectMutation';

// MISCELLANEOUS
import { exportCSV, socialUtils } from '../../../miscellaneous/';

// STYLE
import './BatchJobsExecutedList.less';

// COMPONENTS
import PageListComponent from '../_Class/_PageListComponent/PageListComponent';
import TableList from  '../../components/TableList/TableList';

// STYLE
import './BatchJobsExecutedList.less';

import moment from 'moment';
import Pagination from '../../components/Pagination/Pagination';


type BatchJobsExecutedListProps = {
	match: any
}; 
type BatchJobsExecutedListState = { }; 
type PageListComponentProps = {};
type PageListComponentState = {};

class BatchJobsExecutedList<BatchJobsExecutedListProps, BatchJobsExecutedListState> extends PageListComponent<PageListComponentProps, PageListComponentState> {

	constructor(props: BatchJobsExecutedListProps) {
    
		super(props);
		this.state = {}
	}

	render() {

		let Component = (
			<BatchJobsExecutedListContent 
				queryGraphQL={ BatchJobExecutedListSelectQueryGraphQL } 
				params={{ limit: 10, page: 1 }}
				body={ undefined } 
			/>
		);

		Component = this.fetchInitData(Component); 
		Component = this.getRenderTemplate(Component, "Batch Job Executed List");
	
		return (
			<React.Fragment>
				{ this.isAuth(true) }
				<Component />
			</React.Fragment>
		);
  }
}


type BatchJobsExecutedListContentProps = {
	queryGraphQL: 						any
	params: 									any
	body: 										any
};
type BatchJobsExecutedListContentState = {
	batchJobExecutedList?: 		Array<BatchJobExecutedType>
};

class BatchJobsExecutedListContent extends React.Component<BatchJobsExecutedListContentProps, BatchJobsExecutedListContentState> {
	
	constructor(props: BatchJobsExecutedListContentProps) {
    
		super(props);
		this.state = { }
	}

	componentWillMount() {
		this.setState({ batchJobExecutedList: this.props.body.getBatchJobExecutedList?.batchJobExecutedList });
	}

	private getCSV = (batchJobId: number, pageSocialInternalId: string): any => {

		alert("Add this function!")

		// const variables = {
		// 	pageInternalId: pageSocialInternalId,
		// };

		// this.fetchQuery(environment, AdsBySocialPageIdSelectQueryGraphQL, variables)
		// 	.then((data) => {

		// 		if (data.adsBySocialPageId.code == 200)
		// 			exportCSV("ads-list-" + pageSocialInternalId + ".csv", data.adsBySocialPageId.payload);

		// 	}).catch((err) => {

		// 		console.log(err);
		// 	});
	}

	// private serializeData = (): any => {

	// 	let data: any[] = [];

	// 	data = this.state.batchJobExecutedList?.map((item: BatchJobExecutedType) => {
	
	// 		if (!item) return {};

	// 		return {
	// 			"id": 								item.id,
	// 			"internalId": 				socialUtils.getLinkSocialPlatform(item.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, item.batchJob.pageSocial.internalId), 
	// 			"name": 							item.batchJob.pageSocial.name, 
	// 			"publisherPlatform": 	item.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform, 
	// 			"view": 							<a href={`page-social/${item.id}`}>View</a>, 
	// 			"exportCSV": 					<button onClick={() => this.downloadCSV(item.batchJob.pageSocial.internalId)}>Export CSV</button>,
	// 		};
	// 	});

	// 	return {
	// 		"header": ["ID", "Social ID", "Name", "Platform", "", ""],
	// 		"content": data
	// 	};
	// }

	private changePagination = () => {

		const list: BatchJobExecutedType[] = [];
		
		commitMutation(
			environment,
			{
				mutation: BatchJobExecutedListSelectMutationGraphQL,
				variables: { limit: 10, page: 1 },
				// variables: { params: data },
				onCompleted: (response) => {
					
					alert(JSON.stringify(response))
					console.log(response)
					// this.setState({ redirect: true });
				},
			},
		);

		this.setState({ batchJobExecutedList: list});
	};

	render() {
		return (
			<section id="batch-job-executed-list">
				<div className="custom-table">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th className="text-center">Ads</th>
								<th>Time</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.batchJobExecutedList?.map((item: BatchJobExecutedType, index: number) => {
										
									if (!item) return <></>;

									let timeExecuted = moment(item.created, "YYYY-MM-DDTHH:mm:ss a");

									return (
										<tr key={index}>
											<td>
												<div className="foreground">
													{ item.batchJob.pageSocial.name }
												</div>
												<div className="background internal-id">
													{ item.batchJob.pageSocial.internalId }
												</div>
											</td>
											<td className="num-ads text-center">
												{ item.numAds }
											</td>
											<td>
												<div>{ timeExecuted.format("HH:mm") }</div>
												<div className="background">{ timeExecuted.format("DD/MM/YYYY") }</div>
											</td>
											<td className="search-keywords">
												{ (item.byBatch) ? "Batch" : "Manual" }
											</td>
											<td style={{ textAlign: "right" }}>
												<button 
													className="btn export-csv"
													onClick={() => this.getCSV(0, "123")}
												>
													Export CSV
												</button>
												<a 
													className="button view-details"
													href={`/batch-job-executed/${item.id}`}
												>
													View Job
												</a>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<Pagination 
						numElementPage={ 10 }
						totalElement={ 43 }
						changePageHandler={ this.changePagination }
					/>
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

export default BatchJobsExecutedList;