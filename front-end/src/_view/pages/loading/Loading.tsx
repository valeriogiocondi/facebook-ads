import React, { Fragment } from 'react';

// STYLE
import './Loading.less';


type LoadingState = { }; 
type LoadingProps = { }; 

export default class Loading extends React.PureComponent<LoadingProps, LoadingState> {

	constructor(props: LoadingProps) {
    
		super(props);
		this.state = {}
    }
    
	render() {
		
		return (
			<Fragment>
				<div id="loading">
					<h1> Loading... </h1>
				</div>
			</Fragment>
        );
    }
}