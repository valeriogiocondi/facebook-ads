import React from 'react';
import { Link } from 'react-router-dom';

// MODEL
// import { DemographicDistributionPersonType } from '../../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// STYLE
import './Menu.less';
import { 
	History as HistoryIcon, 
  Home as HomeIcon, 
	Schedule as ScheduleIcon, 
	Undo as UndoIcon 
} 
from '@material-ui/icons';


export default class Menu extends React.PureComponent<{}, {}> {

	constructor(props: {}) {
      
		super(props);
		this.state = { };
	}
	
	componentDidMount() { }

	render() {
		return (
			<React.Fragment>
				<div 
					id="menu" 
					className="float-right"
				>
					<ul className="list">
						<li key={1}>
							<Link to="/"> 
								<span className="icon">
									<HomeIcon /></span> Home 
								</Link>
						</li>
						<li key={2}>
							<Link to="/batch-job-list"> 
								<span className="icon">
									<ScheduleIcon /></span> Batch 
								</Link>
						</li>
						<li key={3}>
							<Link to="/batch-job-executed-list"> 
								<span className="icon">
									<HistoryIcon /></span> Jobs 
								Executed </Link>
						</li>
						<li key={4}>
							<Link to="/logout"> 
								<span className="icon">
									<UndoIcon /></span> Logout 
								</Link>
						</li>
					</ul>
				</div>
				<div className="clearfix"></div>
			</React.Fragment>
		);
	}
}