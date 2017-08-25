import { Component, NgModule, Input,ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { MaterialModule }				from '@angular/material';
import { CommonModule }					from '@angular/common';
import * as d3 from 'd3';


//참조 : http://fiddle.jshell.net/zUj3E/2/

@Component({
	selector: 'line-chart',
	template: `<svg width="100%"></svg>`
})
export class LineChartComponent implements AfterViewInit {

	name:string;
	chartData:any;
	@Input("name") set myChartName(value: string) {
		this.name = value;
	}
	opts:any

	@Input("chartData") set myChartData(value: any) {
		if(typeof value == 'undefined')
			return;
		this.chartData = value;
		this.opts = {"legend":value.legend, "data":value.values, "margin": {top: 20, right: 86, bottom: 20, left: 35}, x_axis_ticks: value.values.length};
		this.draw();

	}

@HostListener('window:resize', ['$event.target'])
	onResize() {
		if(typeof this.opts == 'undefined')
			return;
		this.draw();
	}
	private svg;
	private tooltip;
	private graph_width:number;
	private graph_height:number;
  /**
  * We request angular for the element reference
  * and then we create a D3 Wrapper for our host element
  **/
	element:ElementRef

	lc:any = {};
	constructor(el: ElementRef) {
		this.element = el;
	}

	ngAfterViewInit() {
     // const hostElem = this.element.nativeElement;

	  this.tooltip = d3.select("#chartTooltip").style("opacity", 0);
    }

	private draw(){
		this.set_options();

		this.build_svg();
		this.calculate_domain();
		this.plot_axis();
		this.plot_line();

		this.lc.legend.forEach(function(val, index) {
			this.plot_legend(val, index);
		}.bind(this));

		this.lc.data.forEach(function(val, index) {
			this.plot_points(val, index);
		}.bind(this));
	}


	private set_options(){
		let opts:any	= this.opts ||{};
		this.lc = {
			parent: opts.parent || 'body',
			class: 'd3-line-chart',
			legend: opts.legend,
			data: opts.data,
			margin: opts.margin || {top: 20, right: 100, bottom: 30, left: 60},
			x_scale: opts.x_scale || d3.scaleLinear(),
			y_scale: opts.y_scale || d3.scaleLinear(),
			y_axis_text: opts.y_axis_text || 'y-axis',
			x_axis_ticks: opts.x_axis_ticks || 5,
			tooltip: opts.tooltip || function(div, point) {
				div.select('.desc').text(point.text+" : "+point.count);
			}
		};

	//	this.graph_width = this.element.nativeElement.offsetWidth;
	this.graph_width = this.element.nativeElement.parentNode.offsetWidth;
	 	this.graph_height = 150;

		this.lc.width = this.graph_width - (this.lc.margin.left / 2) - (this.lc.margin.right / 2);
		this.lc.height = this.graph_height - this.lc.margin.top - this.lc.margin.bottom;
		this.lc.x_scale.range([this.lc.margin.left, this.lc.width]);
		this.lc.y_scale.range([this.lc.height + this.lc.margin.top, 0 + this.lc.margin.top]);
	}

	/**
	 * build_svg
	 * @description SVG 생성
	 */

	private build_svg() {
	//svg에 내부 g를 추가하여 전체 레이 아웃을 생성한다.

		d3.select("#"+this.name).select("svg").remove();
		this.svg = d3.select("#"+this.name)
					 .append("svg")
					 .attr('width', this.graph_width)
					 .attr('height', this.graph_height)
	}

	/**
	 * calculate_domain
	 * @description d3 도메인 생성
	 * @param {Object} lc - 옵션값
	 */
	private calculate_domain() {

		this.lc.x_scale.domain([
			d3.min(this.lc.data, function(d) { return (d.turn - 0.4); }),
			d3.max(this.lc.data, function(d) { return d.turn + 0.4; })
		]);
		this.lc.y_scale.domain([
			d3.min(this.lc.data, function(d) { return (d.count - 15); }),
			d3.max(this.lc.data, function(d) { return d.count + 15; })
		]);
	}

	/**
	 * plot_axis
	 * @description d3 좌표 생성
	 * @param {Object} lc - 옵션값
	 */
	private plot_axis() {

		let xAxis = d3.axisTop(this.lc.x_scale)
			.ticks(this.lc.x_axis_ticks)//
			.tickFormat(function(d) {
				return d + '회';
			})
			.tickSize(-this.lc.height, 0)
			.tickPadding(8);


		this.svg.append("g")
			.attr('class', 'axis axis_x')
			.attr('transform', 'translate(0, ' + this.lc.margin.top + ')')
			.style('font-weight', 'bold')
			.style('font-size', '13px')
			.call(xAxis)
			.selectAll('line')
			.attr('stroke', '#c7c7c7');

		let yAxis = d3.axisLeft(this.lc.y_scale)
			.ticks(5)
			.tickSize(-(this.lc.width - this.lc.margin.left))
			.tickPadding(8);

		this.svg.append('g')
			.attr('class', 'axis axis_y')
			.attr('transform', 'translate('+ this.lc.margin.left + ', '  + 0 + ')')
			//.style('font-size', '11px')
			.call(yAxis)
			.selectAll('line')
			.attr('stroke', '#ccc')
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(this.lc.y_axis_text);
	}

	/**
	 * plot_line
	 * @description 라인 생성
	 */
	private plot_line() {
		let line = d3.line()
			.x(function(d) { return this.lc.x_scale(d.turn); }.bind(this))
			.y(function(d) { return this.lc.y_scale(d.count); }.bind(this));

		this.svg.append('path')
			.attr('class', 'line')
			.attr('d', line(this.lc.data))
			.attr('fill', 'none')
			.style('stroke', '#065286');
	}

	/**
	 * plot_legend
	 * @description 레전드 생성
	 */
	private plot_legend(data, index) {
		let legend = this.svg.append('g');

		legend.append('text')
			.attr('class', 'legend-text-' + index)
			.style('font-size', '11px')
			.text([data.text])
			.attr('x', this.lc.width + 20)
			.attr('y', 30 + index * 16);

		legend.append('circle')
			.attr('class', 'legend-circle')
			.attr('cx', this.lc.width - 8 + 20)
			.attr('cy', 26 + index * 16)
			.attr('r', 5)
			.style('fill', function(d) {
				return data.color;
			});
	}

	/**
	 * plot_points
	 * @description 포인트 지점 생성
	 */
	private plot_points(data, index) {
		this.svg.selectAll('.circle-' + index).data([data])
			.enter()
			.append('g')
			.append('circle')
			.attr('class', 'circle')
			.attr('cx', function(d) { return this.lc.x_scale(d.turn); }.bind(this))
			.attr('r', 11) // 포인트 크기 조절
			.attr('cy', function(d) { return this.lc.y_scale(d.count); }.bind(this))
			.style('stroke', d3.rgb(54,54,54).brighter())
			.style('fill', function(d) {
				// 동일 텍스트값 컬러 매칭
				let legend = this.lc.legend;

				for ( let i = 0, len = legend.length; i < len; i++ ) {
					if ( legend[i].text === data.text ) {
						return this.lc.legend[i].color;
					}
				}
			}.bind(this))
			.on("mouseover", function(d) {
				this.tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				this.tooltip.html( d.text+":"+d.count )
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
				}.bind(this))
			.on("mouseout", function(d) {
				this.tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			}.bind(this));
	}

}

@NgModule({
	imports:		[ CommonModule, MaterialModule ],//MaterialModule
	declarations:	[ LineChartComponent ],//, IconComponent
	exports:		[ LineChartComponent ],//, IconComponent
	providers:		[ ]
})
export class LineChartModule {// extends HammerGestureConfig

}
