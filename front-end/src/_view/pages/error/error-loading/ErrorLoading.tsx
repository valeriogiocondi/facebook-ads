import React, { Fragment } from 'react';

// PAGE
import Error from '../error/Error';

// STYLE
import './ErrorLoading.less';
import { KeyboardBackspace } from '@material-ui/icons';


type ErrorLoadingProps = {
	description: string,
}; 

export default class ErrorLoading extends React.PureComponent<ErrorLoadingProps, {}> {

	constructor(props: ErrorLoadingProps) {
    
		super(props);
		this.state = {}
  }
	
	private goBack = (event: any):void => {

		event.preventDefault();
		window.history.back();
	}
    
	render() {
		
		return (
			<Fragment>
				<Error
					title="Error Loading"
					description={this.props.description}
				>
					{/* <div id="error-loading">
						<button className="button" onClick={(e) => this.goBack(e)}>
							<KeyboardBackspace />
						</button>
						<span>Go Back</span>
					</div> */}
				</Error>
			</Fragment>
    );
  }
}