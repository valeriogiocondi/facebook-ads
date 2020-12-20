import React, { Fragment } from 'react';

// MODEL
import FacebookAds from '../../../_model/types/facebook-ads-objects/facebook-ads-class';
import HttpResponse from '../../../_model/types/http-response';
import { DemographicDistributionType, DemographicDistributionPersonType, DemographicDistributionPersonDataType } from '../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// GRAPHQL RELAY
import RelayRenderer from '../../relay/RelayRenderer';
import queryGraphQL from '../../../_model/relay/query/AdsSelectQuery';

// SERVICES
// import { rest } from '../../../services/RestService';

// STYLE
import './Ads.less';
import { KeyboardBackspace } from '@material-ui/icons';

import BarChart from '../../components/charts/bar-chart/BarChart';


type AdsProps = {
	match: any,
}; 

export default class Ads extends React.PureComponent<AdsProps, {}> {

	constructor(props: AdsProps) {
    
		super(props);
		this.state = {}
    }
    
	render() {
		
		return (
			<Fragment>			
				<RelayRenderer
					query={ queryGraphQL }
					params={{ adsId: this.props.match.params.id }} 
				>
					<AdsContent body="" />
				</RelayRenderer>
			</Fragment>
        );
    }
}


type AdsContentProps = {
	body: any,
};

class AdsContent extends React.PureComponent<AdsContentProps, {}> {

	constructor(props: AdsContentProps) {
    
		super(props);
		this.state = {}
	}
	
	// TODO
	// use Moment.js
	setDateFormat(milliseconds: string): string {

		let date = new Date(null);
		date.setMilliseconds(parseInt(milliseconds));

		let dateStr = date.toISOString().substr(0, 10).split('-');
		let timeStr = date.toISOString().substr(11, 16).split(':');

		return	dateStr[2] + "/" +
			 	dateStr[1] + "/" +
			 	dateStr[0] + " - " +
			 	timeStr[0] + ":" +
			 	timeStr[1]
		;
	}

	render() {
		
		let fbAds : FacebookAds = this.props.body.adsById;

		// TODO
		// create a custom 404 component
		if (!fbAds)
			return (
				<Fragment>
					ERROR!
				</Fragment>
			);

		return (
			<Fragment>
				<div id="ads" className="main">
					<div className="container">
						<header>
							<a href="/">
								<KeyboardBackspace />
							</a>
						</header>
						<section>
							<div className="row">
								<div 
									id="photo"
									className="col"
								>
									<p className="text-not-available">
										NOT AVAILABLE
										<a href={fbAds.adSnapshotUrl} target="_blank">Snapshot URL</a>
									</p>
								</div>
								<div className="col-8">
									<header className="title">
										<span className="label"> TITLE </span>
										<h1> {fbAds.adCreativeLinkTitle} </h1>
									</header>
									<section>
										<div className="description">
											<span className="label"> DESCRIPTION </span>
											<p className="text-justify"> {fbAds.adCreativeBody} </p>
										</div>
									</section>
									<section>
										<section>
											<div className="field platform">
												<div className="label">
													PLATFORM
												</div>
												<div className="value">
													{fbAds.publisherPlatforms}
												</div>
											</div>
									</section>
										<section>
											<div className="field">
												<div className="label">
													PAGE NAME
												</div>
												<div className="">
													<a
														className="link" 
														href={"https://www.facebook.com/profile.php?id="+fbAds.pageId} 
														target="_blank"
													>
														{fbAds.pageName}
													</a>
												</div>
											</div>
											<div className="field">
												<div className="label">
													FUNDING ENTITY
												</div>
												<div className="">
													{fbAds.fundingEntity}
												</div>
											</div>
										</section>
										<section>
											<div className="field">
												<div className="label">
													CREATION TIME
												</div>
												<div className="">
													{this.setDateFormat(fbAds.adCreationTime)}
												</div>
											</div>
											<div className="field">
												<div className="label">
													DELIVERY START_TIME
												</div>
												<div className="">
													{this.setDateFormat(fbAds.adDeliveryStartTime)}
												</div>
											</div>
										</section>
										<section>
											<div className="field">
												<div className="label">
													ID ADS
												</div>
												<div className="">
													<a 
														className="link no-bold"
														href={"https://www.facebook.com/ads/archive/render_ad/?"+fbAds.id}
														target="_blank"
													>
														#{fbAds.id}
													</a>
												</div>
											</div>
										</section>
										<section>
											<div className="field">
												<div className="label">
													LINK CAPTION
												</div>
												<div className="">
													<a 
														className="link"
														href={fbAds.adCreativeLinkCaption}
														target="_blank"
													>
														{fbAds.adCreativeLinkCaption}
													</a>
												</div>
											</div>
											<div className="field">
												<div className="label">
													LINK DESCRIPTION
												</div>
												<div className="">
													{fbAds.adCreativeLinkDescription}
												</div>
											</div>
											<div className="field">
												<div className="label">
													LINK TITLE
												</div>
												<div className="">
													{fbAds.adCreativeLinkTitle}
												</div>
											</div>
										</section>
										<section>
											<div className="field font-weight-700">
												<div className="label">
													BUDGET RANGE
												</div>
												<div className="value">
													{fbAds.spend.lowerBound} - {fbAds.spend.upperBound} {fbAds.currency}
												</div>
											</div>
										</section>
										<section>
											<div className="field font-weight-700">
												<div className="label">
													IMPRESSIONS
												</div>
												<div className="value">
													{fbAds.impressions.lowerBound} - {fbAds.impressions.upperBound}
												</div>
											</div>
										</section>
									</section>
								</div>
							</div>
						</section>
						<section className="distribuzione-demografica">
							{/* 
							<BarChart 
								demographicDistributionWoman={fbAds.demographicDistribution.female}
								demographicDistributionMan={fbAds.demographicDistribution.male}
							/>
 							*/}
						</section>
						<section>
								<div>
									- {JSON.stringify(fbAds.regionDistribution)}
								</div>
						</section>
					</div>
				</div>
			</Fragment>
		);
    }
}