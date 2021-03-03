import React from 'react';
import { Link } from 'react-router-dom';

// MODEL
// import { DemographicDistributionPersonType } from '../../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// REDUX - ACTION_CREATORS
import { storeThemeAction  } from '../../../_model/redux/actions/actions-creators';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// STYLE
import './Menu.less';

reduxStore.dispatch( storeThemeAction({ value: "light" }) );

type MenuState = {
	themeClass: string
};
type MenuProps = { };

class Menu extends React.Component<MenuProps, MenuState> {

	constructor(props: MenuProps) {
      
		super(props);
		this.state = { 
			themeClass: reduxStore.getState().themeReducer.value
		};
	}
	
	componentDidMount() { }

	private toggleTheme() { 

		let currentValue = reduxStore.getState().themeReducer.value;
		let nextValue = (currentValue === "dark") ? "light" : "dark";
		
		this.setState({ themeClass: nextValue });
		reduxStore.dispatch( storeThemeAction({ value: nextValue }) );
	}

	render() {

		return (
			<div className={ this.state.themeClass }>
				<div id="menu">
					<div className="container text-right">
						<ul className="list">
							<li key={1}>
								<Link to="/">Home</Link>
							</li>
							<li key={2}>
								<Link to="/batch-job-list">Batch</Link>
							</li>
							<li key={3}>
								<Link to="/batch-job-executed-list">Jobs Executed</Link>
							</li>
							<li key={4}>
								<Link to="/logout">Logout</Link>
							</li>
							<li key={5}>
								<ToggleButton toggleTheme={ this.toggleTheme.bind(this) } />
							</li>
						</ul>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="clearfix"></div>
			</div>
		);
	}
}


type ToggleButtonState = {
	themeClass: 	string
};
type ToggleButtonProps = { 
	toggleTheme: Function
};

class ToggleButton extends React.Component<ToggleButtonProps, ToggleButtonState> {

	constructor(props: ToggleButtonProps) {
      
		super(props);
	}
	
	render() {
		return (
			<button 
				id="toggle-button"
				className="right" 
				onClick={ () => this.props.toggleTheme() } 
			>
				<ul className="transition-03">
					<li> <div> Light </div> </li>
					<li> <div> Dark </div> </li>
				</ul>
			</button>
		);
	}
}

export default Menu;