import React, { Fragment } from 'react';

// PAGE
import Error from '../error/Error';

// STYLE
import './Error404.less';
import { KeyboardBackspace } from '@material-ui/icons';


export default class Error404 extends React.PureComponent<{}, {}> {

	constructor(props: {}) {
    
		super(props);
		this.state = {}
	}
	
	private goBack = (event: any):void => {

		event.preventDefault();
		window.history.back();
	}
    
	render() {
		
		return (
			<div id="error-404">
				<Error
					title="Error 404 "
					description="Page Not Found"
				>
					<div>
						<button className="button" onClick={(e) => this.goBack(e)}>
							<KeyboardBackspace />
						</button>
						<span>Go Back</span>
					</div>
				</Error>
			</div>
        );
    }
}