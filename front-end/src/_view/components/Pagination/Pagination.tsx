import React, { Fragment } from 'react';

// STYLE
import './Pagination.less';


type PaginationProps = {
	numElementPage: number,
	totalElement: number,
	changePageHandler: Function,
};
type PaginationState = {
	currentPage: number,
};

export default class Pagination extends React.PureComponent<PaginationProps, PaginationState> {
	
	static defaultProps: Partial<PaginationProps> = {
		numElementPage: 5,
    };
    
    constructor(props: PaginationProps) {

		super(props);
		
		this.state = {
			currentPage: 1,
		}
	}
	
	getPaginationList = (): number[] => {

        return Array.from({ length: (this.props.totalElement/this.props.numElementPage) }, (_, idx) => ++idx)
	}
	
	clickHandler = (page: number): void => {

        if (page !== this.state.currentPage) {

            this.props.changePageHandler(this.props.numElementPage, page);
            this.setState({ currentPage: page });
    
            // TODO
            // Call GraphQL server and use Pagination GraphQL
        }
	};
	
    render() {
		return (
			<Fragment>
                <div className="custom-pagination text-right">
                    <ul className="list-inline"> { 
                        this.getPaginationList().map((item) => { 
                            
                            return <li 
                                key={ item }
                                className={ (item === this.state.currentPage) ? "list-inline-item current-page" : "list-inline-item" }
                                onClick = {() => this.clickHandler(item) }
                            >
                                { item } 
                            </li>
                        }) 
                    } 
                    </ul> 
                </div>
			</Fragment>
		);
	}
}