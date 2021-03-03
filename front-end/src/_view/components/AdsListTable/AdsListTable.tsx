import React, { Fragment } from 'react';

// MODEL
import { AdsType, AdsSpendType } from '../../../_model/types/AdsType';

// STYLE
import './AdsListTable.less';

import moment from 'moment'; 

type AdsListTableProps = {
	adsList: AdsType[]
}
type AdsListTableState = {
}
class AdsListTable extends React.PureComponent<AdsListTableProps, AdsListTableState> {

	constructor(props: AdsListTableProps) {
    
		super(props);
		this.state = {
			batchJob: null,
		}
	}

	render() {

		const getAdsSpend = (x: AdsSpendType): string => {
			
			return (x.lowerBound && x.upperBound) ? x.lowerBound+" - "+x.upperBound : "--";
		};

		return (
			<div className="ads-list-component">
				<div className="custom-table">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th className="text-center">Spend</th>
								<th>Title</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.adsList.map((item: AdsType, i: number) => {
									return (
										<tr
											key={`ads-${i+1}`}
										>
											<td>
												<div className="publisher-platforms">
													{ item.publisherPlatforms.reduce((tot: string, curr: string) => tot = ", "+curr ) }
												</div>
												<div className="background">{ item.id }</div>
											</td>
											<td className="text-center">
												{ getAdsSpend(item.spend) }
											</td>
											<td>
												<div className="ads-title">
													{ item.adCreativeLinkTitle }
												</div>
												<div>
													<a 
														href={ item.adSnapshotUrl }
														target="_blank"
													> 
														Snapshot URL
													</a>
												</div>
											</td>
											<td>
												<div className="foreground">Created time</div>
												<div className="background created-time">
													{ moment(item.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
												</div>
											</td>
											<td>
												<div className="foreground">Start time</div>
												<div className="background start-time">
													{ moment(item.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
												</div>
											</td>
											<td>
												<a 
													className="button view-details"
													href={`/ads/${item.id}`}
												>
													View Ads
												</a>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default AdsListTable;