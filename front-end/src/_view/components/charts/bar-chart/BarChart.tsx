import React, { Fragment } from 'react';

// MODEL
import { DemographicDistributionPersonType } from '../../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// STYLE
import './BarChart.less';

// D3.js
import * as d3 from "d3";


type BarChartProps = {
	demographicDistributionWoman: DemographicDistributionPersonType
	demographicDistributionMan: DemographicDistributionPersonType
}

export default class BarChart extends React.PureComponent<BarChartProps, {}> {
 
    constructor(props: BarChartProps) {

		super(props);
	}
	
	demographicDistributionMapper(distribution: DemographicDistributionPersonType, type: string): any {

		if (type === "woman") {
		
			return distribution.map((item) => {

				return {
					ageRange: item.age,
					value: item.percentage,
					color: 'pink'
				};

			});
		}
		
		return distribution.map((item) => {

			return {
				ageRange: item.age,
				value: item.percentage,
				color: 'blue'
			};

		});
		
	}
 
    componentDidMount() {

		// TODO
		// check if SVG exist, earler, put this into render()
		setTimeout(() => {
						
			// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
			// https://jsfiddle.net/matehu/w7h81xz2/
			// https://github.com/d3/d3/wiki/Gallery
			// https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
			// https://d3-wiki.readthedocs.io/zh_CN/master/SVG-Axes/
			
			const margin = 60;
			const width = 1000 - 2 * margin;
			const height = 600 - 2 * margin;
				
			const arrayWoman = this.demographicDistributionMapper(this.props.demographicDistributionWoman, "woman");
			const arrayMan = this.demographicDistributionMapper(this.props.demographicDistributionMan, "man");
						
			const min = 0;
			const max = Math.max.apply(
								Math, 
								arrayWoman.concat(arrayMan)
									.map((item) => { return item.value; })
							);
	
							
			// SVG element
			const svg = d3.select('.bar-chart').select('svg');
			

			/* 
			 *	CREATING SCALES
			 *	
			 */
			const womanScale = d3.scaleBand()
							.domain(arrayWoman.map((s) => s.ageRange)) /* unit in context */
							.range([0, width]) 							/* unit in px */
							.padding(0.6)
						;
			const manScale = d3.scaleBand()
							.domain(arrayMan.map((s) => s.ageRange)) 	/* unit in context */
							.range([0, width]) 							/* unit in px */
							.padding(0.6)
						;
			const yScale = d3.scaleLinear()
							.domain([min, max]) 	/* unit in context */
							.range([height, 0]) 	/* unit in px */
						;
			

			/* 
			 *	CREATE CHART
			 *
			 */
			const chart = svg.append('g')
							.attr('transform', `translate( ${margin},  ${margin})`)
						;
			
			/* 
			chart.append('g')
				.attr('class', 'grid')
				.call(
					d3.axisLeft(yScale)
					.scale(yScale)
					.tickSize(width)
				)
			; 
			*/

			/* 
			 *	CREATE x-axis AND y-axis 
			 *
			 */
			chart.append('g')
				.attr('transform', `translate(0, ${height})`)
				.call(
					d3.axisBottom(womanScale)
						.tickPadding(10)
				)
			;
			chart.append('g')
				.call(
					d3.axisLeft(yScale)
						.tickPadding(10)
				)
			;

	
			/* 
			 *	ADDING SCALES TO CHART
			 *
			 */

			chart.selectAll(".bar-woman")
				.data(arrayWoman)
				.enter()
				.append('g')
				.append('rect')
				.attr('class', 'woman')
				.attr('x', (s) => womanScale(s.ageRange) + womanScale.bandwidth()/2)
				.attr('y', (s) => yScale(s.value))
				.attr('width', womanScale.bandwidth()/2)
				.attr('height', (s) => height - yScale(s.value))
				.style("fill", "pink")
				.text()
			;
			
			chart.selectAll(".bar-man")
				.data(arrayMan)
				.enter()
				.append('g')
				.append('rect')
				.attr('class', 'man')
				.attr('x', (s) => manScale(s.ageRange))
				.attr('y', (s) => yScale(s.value))
				.attr('width', manScale.bandwidth()/2)
				.attr('height', (s) => height - yScale(s.value))
				.style("fill", "#1F64BD")
				.text('0.3')
			;

			
			/* 
			 *	ADDING TEXT TO BAR
			 *
			 */

			chart.selectAll(".bar-woman")
				.data(arrayWoman)
				.enter()
				.append('g')
				.append('text')
				.attr('class', 'value')
				.attr('x', (a) => womanScale(a.ageRange) + womanScale.bandwidth()/2 + 14)
				.attr('y', (a) => yScale(a.value) + 30)
				.attr('writing-mode', 'vertical-rl')
				.attr('text-anchor', 'middle')
				.style('fill', '#0000000')
				.text((a) => a.value.toFixed(2)+' %')
			;

			chart.selectAll(".man-woman")
				.data(arrayMan)
				.enter()
				.append('g')
				.append('text')
				.attr('class', 'value')
				.attr('x', (a) => manScale(a.ageRange) + manScale.bandwidth()/2 - 13)
				.attr('y', (a) => yScale(a.value) + 30)
				.attr('writing-mode', 'vertical-rl')
				.attr('text-anchor', 'middle')
				.style('fill', '#FFFFFF')
				.text((a) => a.value.toPrecision(2)+' %')
			;

			/* 
			 *	ADDING TEXT TO CHART
			 *
			 */

			chart.append('text')
				.attr('class', 'label')
				.attr('x', width -15)
				.attr('y', height - 15)
				.attr('text-anchor', 'middle')
				.text('Age')
			;
			
			chart.append('text')
				.attr('class', 'label')
				.attr('x', -20)
				.attr('y', 20)
				.attr('transform', 'rotate(-90)')
				.attr('text-anchor', 'middle')
				.text('Values')
			;

			svg.append('text')
				.attr('class', 'title')
				.attr('x', width / 2 + margin)
				.attr('y', 40)
				.attr('text-anchor', 'middle')
				.text('Distribuzione demografica')
		
		}, 1000);
		
    }

    render() {
        return (
            <Fragment>
                <div className="bar-chart">
                    <svg />
                </div>
            </Fragment>
        );
    }
}