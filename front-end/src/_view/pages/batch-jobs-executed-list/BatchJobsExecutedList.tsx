import React from 'react';

// MODEL
import BatchJobExecutedType from '../../../_model/types/BatchJobExecutedType';

// GRAPHQL
import BatchJobExecutedListSelectQueryGraphQL from '../../../_model/relay/query/BatchJobExecutedSelectQuery';

// MISCELLANEOUS
import { exportCSV, socialUtils } from '../../../miscellaneous/';

// STYLE
import './BatchJobsExecutedList.less';

// COMPONENTS
import PageListComponent from '../_PageListComponent/PageListComponent';
import TableList from  '../../components/TableList/TableList';

// STYLE
import './BatchJobsExecutedList.less';


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
		this.state = {}
	}

	componentWillMount() {
		this.setState({ batchJobExecutedList: this.props.body.getBatchJobExecutedList?.batchJobExecutedList });
	}

	private downloadCSV = (pageSocialInternalId: string): any => {

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

	private serializeData = (): any => {

		let data: any[] = [];

		data = this.state.batchJobExecutedList?.map((item: BatchJobExecutedType) => {
	
			if (!item) return {};

			return {
				"id": 								item.id,
				"internalId": 				socialUtils.getLinkSocialPlatform(item.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, item.batchJob.pageSocial.internalId), 
				"name": 							item.batchJob.pageSocial.name, 
				"publisherPlatform": 	item.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform, 
				"view": 							<a href={`page-social/${item.id}`}>View</a>, 
				"exportCSV": 					<button onClick={() => this.downloadCSV(item.batchJob.pageSocial.internalId)}>Export CSV</button>,
			};
		});

		return {
			"header": ["ID", "Social ID", "Name", "Platform", "", ""],
			"content": data
		};
	}

	render() {
		return (
			<section id="batch-job-executed-list">
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

export default BatchJobsExecutedList;





// import React from 'react';
// import moment from 'moment';

// // CONFIG
// import Config from '../../../const/config';

// // MODEL
// // import FacebookAds from '../../../_model/types/facebook-ads-objects/facebook-ads-class';
// // import HttpResponse from '../../../_model/types/http-response';

// // GRAPHQL RELAY
// import RelayRenderer from '../../relay/RelayRenderer';
// import batchJobExecutedQueryGraphQL from '../../../_model/relay/query/BatchJobExecutedSelectQuery';

// // MISCELLANEOUS
// import { socialUtils } from '../../../miscellaneous/';

// // STYLE
// import './BatchJobsExecutedList.less';

// // COMPONENTS
// import TableList from  '../../components/TableList/TableList';


// type BatchJobsExecutedListProps = {
// 	body: any
// };

// export default class BatchJobsExecutedList extends React.PureComponent<BatchJobsExecutedListProps, {}> {

// 	constructor(props: BatchJobsExecutedListProps) {
	
// 		super(props);
// 		this.state = {};
// 	}
	
// 	componentDidMount() {
// 	}
	
// 	serializeData = (): any => {

// 		let data: any[] = [];

// 		data = this.props.body.getBatchJobExecutedList?.batchJobExecutedList	?.map((item) => {
	
// 			if (!item) return {};

// 			return {
// 				"id": item.id, 
// 				"internalId": socialUtils.getLinkSocialPlatform(item.pageSocial.publisherPlatform.idPublisherPlatform, item.pageSocial.internalId), 
// 				"name": item.pageSocial.name, 
// 				"keywords": (item.pageSocial.searchTerms) ? item.pageSocial.searchTerms : "--", 
// 				"timeExecuted": moment(item.created, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD/MM/YYYY - HH:mm"), 
// 				"isBatch": (item.byBatch) ? "Sì" : "No", 
// 			};
// 		});

// 		return {
// 			"header": ["#", "Page URL", " Page Name", "Keywords", "Date Executed", "Batch"],
// 			"content": data
// 		};
// 	}
	
// 	getJobsExecuted = (limit: number, page: number): void => {

// 		// TODO
// 		// Use GraphQL Pagination
// 		alert('getJobExecuted: ' + limit + " - " + page);
// 	}
    
// 	render() {
// 		return (
// 			<section id="batch-job-executed-list">
// 				<TableList 
// 					data={ this.serializeData() } 
// 					changePageHandler={ this.getJobsExecuted } 
// 					numElementPage={ 10 } 
// 				/>
// 			</section>
// 		);
// 	}
// }