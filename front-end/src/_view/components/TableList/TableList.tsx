import React from 'react';

// MODEL
// import { DemographicDistributionPersonType } from '../../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// STYLE
import './TableList.less';

// COMPONENTS
import Pagination from  '../Pagination/Pagination';


type TableListProps = {
	data: any,
	numElementPage? : number,
	// TODO
	// calculate totalElement by data.length
	totalElement? : number,
	changePageHandler? : Function,
}
export default class TableList extends React.PureComponent<TableListProps, {}> {

	static defaultProps: Partial<TableListProps> = {
		numElementPage: 10,
	};
	
    constructor(props: TableListProps) {

		super(props);
		this.state = { }
	}

	componentDidMount() { }

	render() {
		return (
			<div className="table-list">
				<section>
					<table className="table">
						<thead>
							<tr>
								{
									this.props.data["header"].map((item) => {
										return <th scope="col">{ item }</th>;
									})
								}
							</tr>
						</thead>
						<tbody>
							{
								this.props.data["content"]
									.slice(0, this.props.numElementPage)
									.map((item) => {
										
										return <tr> {
											Object.values(item).map((value) => {
												
												return <td scope="col">{ value }</td>;
											})
										}
										</tr>
									})
							}
						</tbody>
					</table>
				</section>
				<footer>
					<Pagination 
						numElementPage={ this.props.numElementPage }
						totalElement={ this.props.totalElement }
						changePageHandler={ this.props.changePageHandler }
					/>
				</footer>
			</div>
		);
	}
}