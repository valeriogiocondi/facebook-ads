import React, { Fragment } from 'react';

// REACT-ROUTER
import { Link, Redirect } from 'react-router-dom';

// MODEL
import BatchJobType from '../../../_model/types/BatchJobType';

// GRAPHQL RELAY
import { commitMutation } from 'react-relay';
import environment from '../../relay/environment';
import RelayRenderer from '../../relay/RelayRenderer';
import selectNewQueryGraphQL from '../../../_model/relay/query/BatchJobSelectNewQuery';
import selectEditQueryGraphQL from '../../../_model/relay/query/BatchJobSelectEditQuery';
import insertQueryGraphQL from '../../../_model/relay/mutation/BatchJobInsertQuery';
import editQueryGraphQL from '../../../_model/relay/mutation/BatchJobEditQuery';

// STYLE
import './BatchJob.less';
import { KeyboardBackspace } from '@material-ui/icons';

import AdsListTable from '../../components/AdsListTable/AdsListTable';


let pageTypes = ["new", "view"];

type BatchJobNewContentProps = {
	match: any,
}

class BatchJob extends React.PureComponent<BatchJobNewContentProps, {}> {

	constructor(props: BatchJobNewContentProps) {
	
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
			<Fragment>
				<RelayRenderer
					query={ (this.props.match.params.type === pageTypes[0]) ? selectNewQueryGraphQL : selectEditQueryGraphQL }
					params={ data } 
				>
					<BatchJobContent body="" match={this.props.match} />
				</RelayRenderer>
			</Fragment>
		);
  }
}


// TODO
// Use entity/types TaskObject 
type BatchJobContentProps = {
	body: any,
	match: any,
}
type BatchJobContentState = {
	batchJob: BatchJobType,

	// id: number,
	// pageId: number,
	// pageInternalId: string,
	// pageName: string,
	// publisherPlatformId: number,
	// adActiveStatus: number,
	// adReachedCountries: number,
	// adType: number,
	// impressionCondition: number,
	// searchTerms: string,
	// time: string,
	redirect: boolean,
}

class BatchJobContent extends React.PureComponent<BatchJobContentProps, BatchJobContentState> {

	constructor(props: BatchJobContentProps) {
    
		super(props);
		this.state = {
			batchJob: null,

			// id: null,
			// pageId: null,
			// pageInternalId: null,
			// pageName: null,
			// publisherPlatformId: null,
			// adActiveStatus: null,
			// adReachedCountries: null,
			// adType: null,
			// impressionCondition: null,
			// searchTerms: null,
			// time: null,
			redirect: false,
		}
	}

	componentWillMount() {
		
		this.setState({ 

			batchJob: {
				...this.props.body.getBatchJobById?.batchJob,
				numAds:	 this.props.body.getBatchJobById?.numAds,
				adsList: this.props.body.getBatchJobById?.adsList
			}
		});
	}

  // componentDidMount() {
		
	// 	/* 
	// 	 *	TODO
	// 	 *	Call ENUMS
	// 	 *	move into Controller
	// 	 */
		
	// 	if (this.props.body.getBatchJobById?.batchJob) {

	// 		this.setState({
	// 			id: this.props.body.getBatchJobById.batchJob.id,
	// 			pageId: this.props.body.getBatchJobById.batchJob.pageSocial.id,
	// 			pageInternalId: this.props.body.getBatchJobById.batchJob.pageSocial.internalId,
	// 			pageName: this.props.body.getBatchJobById.batchJob.pageSocial.name,
	// 			publisherPlatformId: this.props.body.getBatchJobById.batchJob.pageSocial.publisherPlatform.idPublisherPlatform,
	// 			adActiveStatus: this.props.body.getBatchJobById.batchJob.adActiveStatus,
	// 			adReachedCountries: this.props.body.getBatchJobById.batchJob.adReachedCountries,
	// 			adType: this.props.body.getBatchJobById.batchJob.adType,
	// 			impressionCondition: this.props.body.getBatchJobById.batchJob.impressionCondition,
	// 			searchTerms: this.props.body.getBatchJobById.batchJob.searchTerms,
	// 			time: this.props.body.getBatchJobById.batchJob.time,
	// 		});
	// 	}
  // }
	
	// onChangeInputText = (key: string, value: string): void => {

	// 	switch (key) {

	// 		case "page-id": {

	// 			this.setState({pageInternalId: value});
	// 			break;
	// 		}
	// 		case "search-terms": {

	// 			this.setState({searchTerms: value});
	// 			break;
	// 		}
	// 	}
	// }

	// onChangeSelect = (key: string, value: string): void => {
		
	// 	switch (key) {

	// 		case "publisher-platform": {

	// 			this.setState({publisherPlatformId: +value});
	// 			break;
	// 		}
	// 		case "ad-active-status": {

	// 			this.setState({adActiveStatus: +value});
	// 			break;
	// 		}
	// 		case "ad-reached-countries": {

	// 			this.setState({adReachedCountries: +value});
	// 			break;
	// 		}
	// 		case "ad-type": {

	// 			this.setState({adType: +value});
	// 			break;
	// 		}
	// 		case "impression-condition": {

	// 			this.setState({impressionCondition: +value});
	// 			break;
	// 		}
	// 		case "time": {

	// 			this.setState({time: value});
	// 			break;
	// 		}
	// 	}
	// }

	/* 
	 *	TODO
	 *	Move into Controller
	 *
	 */
  saveTask = () => {
		
		/* 
		 * 	TODO	
		 *	request DTO
		 *
		 */
		let graphlQuery;
		let data = {
			id: 									this.state.batchJob.id,
			pageId: 							this.state.batchJob.pageSocial.id,
			pageInternalId: 			this.state.batchJob.pageSocial.internalId,
			publisherPlatformId: 	this.state.batchJob.pageSocial.publisherPlatform.idPublisherPlatform,
			adActiveStatus: 			this.state.batchJob.adActiveStatus,
			adReachedCountries: 	this.state.batchJob.adReachedCountries,
			adType: 							this.state.batchJob.adType,
			impressionCondition: 	this.state.batchJob.impressionCondition,
			searchTerms: 					this.state.batchJob.searchTerms,
			time: 								this.state.batchJob.time,
		};

		if (this.props.match.params.type === pageTypes[0])
			graphlQuery = insertQueryGraphQL;
		else if (this.props.match.params.type === pageTypes[1])
			graphlQuery = editQueryGraphQL;

		/* 
		 *	TODO
		 *	Incapsulate inside class
		 */
		commitMutation(
			environment,
			{
				mutation: graphlQuery,
				variables: { params: data },
				onCompleted: () => {
					
					this.setState({ redirect: true });
				},
			},
		);
	}
	
	send = (event): boolean => {

		event.preventDefault();

		const check = (value: number, message: string): boolean => {

			if (!value && value !== 0) {
				alert(message);
				return false;
			}
			return true;
		};

		if (!check(this.state.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, "Please, select publisher_platofrm"))
			return false;

		if (!check(this.state.batchJob.adActiveStatus, "Please, select ad_active_status"))
			return false;

		if (!check(this.state.batchJob.adReachedCountries, "Please, select ad_reached_countries"))
			return false;
		
		if (!check(this.state.batchJob.adType, "Please, select ad_type"))
			return false;
		
		if (!check(this.state.batchJob.impressionCondition, "Please, select impression_condition"))
			return false;

		// if (!this.state.time) {
		// 	alert("Please, select time");
		// 	return false;
		// }

		this.saveTask();
		return true;
	}
    
	renderRedirect = () => {

		if (!pageTypes.includes(this.props.match.params.type)) 
			return <Redirect to={{pathname: "/404/"}} />;

		if (this.state.redirect)
		  return <Redirect to={{pathname: "/batch-job-list/"}} />;
	}
	
	render() {

		let title, button;

		if (this.props.match.params.type === pageTypes[0]) {

			title = <div className="text-center"><h1>NEW TASK</h1></div>;
			button = <input type="submit" value="SAVE" />;

		} else if (this.props.match.params.type === pageTypes[1]) {
			
			title = <div className="text-center"><h1>EDIT TASK</h1></div>;
			button = <input type="submit" value="SAVE" />;
		}
		
		return (
			<Fragment>
				{ this.renderRedirect() }
				<div id="batch-scheduler-new-task">
					<div className="container">
						<header>
							<Link to="/batch-job-list/">
								<KeyboardBackspace />
							</Link>
							{ title }
						</header>
						<section>
							<form 
								className="form"
								onSubmit={(e) => this.send(e)}
							>
								<section>
									<div className="row">
										<div className="col-4 text-center field page-id">
											<div className="label">search_page_ids</div>
											<div className="text-center input-text">
												<input 
													type="text" 
													value={ this.state.batchJob.pageSocial.internalId }  
													onChange={(e) => this.setState({batchJob: {...this.state.batchJob, pageSocial: {...this.state.batchJob.pageSocial, id: +e.target.value} } }) }
												/>
											</div>
										</div>
										<div className="col-4 text-center field page-name">
											<div className="label">page_name</div>
											<div className="text-center input-text">
												<input 
													type="text" 
													value={ this.state.batchJob.pageSocial.name } 
													readOnly
												/>
											</div>
										</div>
										<div className="col-4 text-center field">
											{/* 
											 *	publisher_platform
											 *	enum {FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, WHATSAPP}
											 *
											 * 	Search for ads based on whether they appear on a particular platform such as Instagram or Facebook. 
											 *	You can provide one platform or a comma separated list of platforms.
											 *
											*/}
											<div className="label">publisher_platform</div>
											<div className="select">
												<select 
													// onChange={(e) => this.onChangeSelect("publisher-platform", e.target.value)}
													onChange={
														(e) => this.setState(
															{batchJob: {
																...this.state.batchJob, 
																pageSocial: {
																	...this.state.batchJob.pageSocial, 
																	publisherPlatform: {
																		...this.state.batchJob.pageSocial.publisherPlatform,
																		idPublisherPlatform: +e.target.value
																	}
																} 
															} 
														}) 
													}
												>
													<option value="" selected>--</option>
													{
														this.props.body.getPublisherPlatformList.publisherPlatformList.map((item) => { 	
			
															if (item.idPublisherPlatform == this.state.batchJob.pageSocial.publisherPlatform.idPublisherPlatform)
																return <option value={item.idPublisherPlatform} selected>{item.valuePublisherPlatform}</option>; 
																
															return <option value={item.idPublisherPlatform}>{item.valuePublisherPlatform}</option>; 
														})
													}
												</select>
											</div>
										</div>
									</div>
								</section>
								<section className="row">
									<div className="col field">
										{/* 
										 *	ad_active_status
										 *	enum {ACTIVE, ALL, INACTIVE}
										 *
										 * 	Search for ads based on the status. 
										 * 	Defaults to ACTIVE for all ads that are eligible for delivery. 
										 * 	Set INACTIVE for ads ineligible for delivery, and ALL for both types.
										 *
										*/}
										<div className="label">ad_active_status</div>
										<div className="select">
											<select 
												// onChange={(e) => this.onChangeSelect("ad-active-status", e.target.value)}
												onChange={
													(e) => {
														this.setState({
															batchJob: {
																...this.state.batchJob,
																adActiveStatus: +e.target.value
															}
														})
													}
												}
											>
												<option value="" selected>--</option>
												{
													this.props.body.getActiveStatusList.activeStatusList.map((item) => { 
		
														if (item.idActiveStatus == this.state.batchJob.adActiveStatus)
															return <option value={item.idActiveStatus} selected>{item.valueActiveStatus}</option>; 
															
														return <option value={item.idActiveStatus}>{item.valueActiveStatus}</option>; 
													})
												}
											</select>
										</div>
									</div>
									<div className="col field">
										{/* 
										 *	ad_reached_countries
										 *	array<enum {BR, GB, US}>
										 *
										 *	Facebook delivered the ads in these countries. Provided as ISO country codes.
										 * 
										 * 	MANDATORY
										 *
										*/}
										<div className="label">ad_reached_countries</div>
										<div className="select">
											<select 
												// onChange={(e) => this.onChangeSelect("ad-reached-countries", e.target.value)}
												onChange={
													(e) => {
														this.setState({
															batchJob: {
																...this.state.batchJob,
																adReachedCountries: +e.target.value
															}
														})
													}
												}
											>
												<option value="" selected>--</option>
												{
													this.props.body.getReachedCountriesList.reachedCountriesList.map((item) => { 
		
														if (item.idReachedCountries == this.state.batchJob.adReachedCountries)
															return <option value={item.idReachedCountries} selected>{item.valueReachedCountries}</option>; 

														return <option value={item.idReachedCountries}>{item.valueReachedCountries}</option>; 
													})
												}
											</select>
										</div>
									</div>
									<div className="col field">
										{/* 
										 *	ad_type
										 *	enum {ALL, EMPLOYMENT_ADS, HOUSING_ADS, POLITICAL_AND_ISSUE_ADS, UNCATEGORIZED_ADS}
										 *
										 * 	Default value: "POLITICAL_AND_ISSUE_ADS"
										 * 	The type of ad. We label either all returned ads as political or issue ads, 
										 * 	or label ads for news related to politics or issues of political importance. 
										 * 	See Facebook Ads Help Center, About ads related to politics or issues of national importance. 
										 * 	We currently only support POLITICAL_AND_ISSUE_ADS.
										 *
										*/}
										<div className="label">ad_type</div>
										<div className="select">
											<select 
												// onChange={(e) => this.onChangeSelect("ad-type", e.target.value)}
												onChange={
													(e) => {
														this.setState({
															batchJob: {
																...this.state.batchJob,
																adType: +e.target.value
															}
														})
													}
												}
											>
												<option value="" selected>--</option>
											{
												this.props.body.getTypeList.typeList.map((item) => { 
	
													if (item.idType == this.state.batchJob.adType)
														return <option value={item.idType} selected>{item.valueType}</option>; 

													return <option value={item.idType}>{item.valueType}</option>; 
												})
											}
											</select>
										</div>
									</div>
									
									<div className="col field">
										{/* 
										 * 	impression_condition
										 * 	enum {
										 * 		 HAS_IMPRESSIONS_LIFETIME, 
										 * 		 HAS_IMPRESSIONS_YESTERDAY, 
										 * 		 HAS_IMPRESSIONS_LAST_7_DAYS, 
										 * 		 HAS_IMPRESSIONS_LAST_30_DAYS, 
										 * 		 HAS_IMPRESSIONS_LAST_90_DAYS
										 * 	}
										 *
										*/}
										<div className="label">impression_condition</div>
										<div className="select">
											<select 
												// onChange={(e) => this.onChangeSelect("impression-condition", e.target.value)}
												onChange={
													(e) => {
														this.setState({
															batchJob: {
																...this.state.batchJob,
																impressionCondition: +e.target.value
															}
														})
													}
												}
											>
												<option value="" selected>--</option>
											{
												this.props.body.getImpressionConditionList.impressionConditionList.map((item) => { 
	
													if (item.idImpressionCondition == this.state.batchJob.impressionCondition)
														return <option value={item.idImpressionCondition} selected>{item.valueImpressionCondition}</option>; 

													return <option value={item.idImpressionCondition}>{item.valueImpressionCondition}</option>; 
												})
											}
											</select>
										</div>
									</div>
								</section>
								{/* 
								<section className="time text-center">
									<div className="field">
										 * 	time
										 * 	string
										 * 
										<div className="label">time</div>
										<div className="select">
											<select onChange={(e) => this.onChangeSelect("time", e.target.value)}>
												<option value="" selected>--</option>
												{
													Object.values(TimeSchedulerEnum).map((item) => { 
		
														if (item === this.state.time)
															return <option value={item} selected>{item}</option>; 

														return <option value={item}>{item}</option>; 
													})
												}
											</select>
										</div>
									</div>
								</section>
								*/}
								<section className="search-terms">
									<div className="text-center field">
										{/* 
										 * 	search_terms
										 * 	string
										 * 	
										 * 	Default value: ""
										 * 	The terms to search for in your query. 
										 * 	We treat a blank space as a logical AND and search 
										 * 	for both terms and no other operators. 
										 * 	The limit of your string is 100 characters or less.
										 * 
										*/}
										<div className="label">search_terms</div>
										<div className="text-center input-text width-100x">
											<input 
												type="text"
												className="text-center"
												placeholder="es1, es2, ..., esN"
												value={ this.state.batchJob.searchTerms }
												// onChange={(e) => this.onChangeInputText("search-terms", e.target.value)}
												onChange={
													(e) => {
														this.setState({
															batchJob: {
																...this.state.batchJob,
																searchTerms: e.target.value
															}
														})
													}
												}
											/>
										</div>
									</div>
								</section>
								<section className="text-center send">
									<input type="submit" value="SAVE" />
								</section>
							</form>
						</section>
						<section>
							<AdsListTable 
								adsList={ this.state.batchJob.adsList }
							/>
						</section>
					</div>
				</div>
			</Fragment>
    );
  }
}

export default BatchJob;