import React from 'react';

// MODEL
import BatchJobExecutedType from '../../../_model/types/BatchJobExecutedType';

// MISCELLANEOUS
import socialUtils from '../../../miscellaneous/social-utils/social-utils';

// REACT-ROUTER
import { Link } from 'react-router-dom';

// GRAPHQL RELAY
import RelayRenderer from '../../relay/RelayRenderer';
import queryGraphQL from '../../../_model/relay/query/BatchJobExecutedSelectQuery';

// STYLE
import './BatchJobExecuted.less';
import { KeyboardBackspace } from '@material-ui/icons';

import AdsListTable from '../../components/AdsListTable/AdsListTable';

import moment from 'moment';


type BatchJobExecutedNewContentProps = {
	match: any,
}

export default class BatchJobExecuted extends React.PureComponent<BatchJobExecutedNewContentProps, {}> {

	constructor(props: BatchJobExecutedNewContentProps) {
	
		super(props);
			this.state = {};
    }

    componentDidMount() {
	
    }
        
	render() {

		/* 
		 * 	TODO	
		 *	request DTO
		 *
		*/
		let data = {
			id: +this.props.match.params.id,
		};

		return (
			<React.Fragment>
				<RelayRenderer
					query={ queryGraphQL }
					params={ data } 
				>
					<BatchJobExecutedContent body="" match={this.props.match} />
				</RelayRenderer>
			</React.Fragment>
		);
  }
}


// TODO
type BatchJobExecutedContentProps = {
	body: any,
	match: any,
}
type BatchJobExecutedContentState = {
	batchJobExecuted: BatchJobExecutedType,
}

class BatchJobExecutedContent extends React.PureComponent<BatchJobExecutedContentProps, BatchJobExecutedContentState> {

	constructor(props: BatchJobExecutedContentProps) {
    
		super(props);
		this.state = {
			batchJobExecuted: null
		}
	}

	componentWillMount() {
		
		this.setState({ 

			batchJobExecuted: {
				...this.props.body.getBatchJobExecutedById?.batchJobExecuted,
				numAds:	 this.props.body.getBatchJobExecutedById?.numAds,
				adsList: this.props.body.getBatchJobExecutedById?.adsList
			}
		});
	}
	
	render() {

		const execTime = this.state.batchJobExecuted.timeExecuted ?? this.state.batchJobExecuted.created;
		const execType = (this.state.batchJobExecuted.byBatch) ?  "Batch" : "Manual";
		const hrefSocial = 
			socialUtils.getLinkSocialPlatform(
				this.state.batchJobExecuted.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, 
				this.state.batchJobExecuted.batchJob.pageSocial.internalId
			);

		return (
			<div id="batch-job-executed">
				<div className="container">
					<header>
						<Link to="/batch-job-executed-list/">
							<KeyboardBackspace />
						</Link>
						Batch Job Executed
					</header>
					<section>
						<header>
							<div className="id">
								#{ this.state.batchJobExecuted.id }
							</div>
							<div className="info">
								<div className="execution-info">
									<div>
										<div className="label">Exec Type:</div>
										<div className="value">{ execType }</div>
									</div>
									<div>
										<div className="label">Exec Time:</div>
										<div className="value">{ moment(execTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }</div>
									</div>
									<div>
										<div className="label">Num Ads:</div>
										<div className="value">{ this.state.batchJobExecuted.numAds ?? 0 }</div>
									</div>
								</div>
								<div className="page-info">
									<div>
										<div className="label">Page Social:</div>
										<div className="value">{ this.state.batchJobExecuted.batchJob.pageSocial.name }</div>
									</div>
									<div>
										<div className="label">Social Platform:</div>
										<div className="value">{ this.state.batchJobExecuted.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform }</div>
									</div>
									<div>
										<div className="label">Tot Ads:</div>
										<div className="value">{ this.state.batchJobExecuted.batchJob.numAds ?? 0 }</div>
									</div>
								</div>
								<div className="batch-info">
									<div>
										<button 
											className="link export-csv"
										>
											Export CSV
										</button>
									</div>
									<div>
										<a 
											className="link"
											href={`/batch-job/view/${this.state.batchJobExecuted.batchJob.id}`}
										>
											View Batch Job
										</a>
									</div>
									<div>
										<a 
											className="link"
											href={ hrefSocial }
											target="_blank"
										>
											View on { this.state.batchJobExecuted.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform }
										</a>
									</div>
								</div>
							</div>
						</header>
						<section>
							<AdsListTable 
								adsList={ this.state.batchJobExecuted.adsList }
							/>
						</section>
					</section>
				</div>
			</div>
    );
  }
}