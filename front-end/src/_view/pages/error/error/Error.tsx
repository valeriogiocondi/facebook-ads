import React, { Fragment } from 'react';

// STYLE
import './Error.less';


type ErrorLoadingProps = {
	title: string,
	description: string,
	children?: any,
}; 

// TODO
// Encapsulate other error pages

export default class Error extends React.PureComponent<ErrorLoadingProps, {}> {

	constructor(props: ErrorLoadingProps) {
    
		super(props);
		this.state = {}
    }
    
	render() {
		
		return (
			<Fragment>
				<div id="error">
					<header>
						<h1>{ this.props.title}</h1>
					</header>
					<section>
						<p className="description">{ this.props.description }</p>
						{ this.props.children }
					</section>
				</div>
			</Fragment>
        );
    }
}