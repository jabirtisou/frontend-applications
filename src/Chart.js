import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Chart = ({ data, selectedCountry }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const width = 1150 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const dateFormat = d3.timeParse('%Y-%m-%d');

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => dateFormat(d.date)))
      .range([0, width])
      .nice();

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickPadding(5))
      .call((g) => g.select('.domain').attr('stroke', '#777777'))
      .selectAll('.tick line')
      .attr('stroke', '#777777')
      .call((g) =>
        g.selectAll('text').attr('color', '#555555').attr('font-size', '12px')
      );

    const y = d3
      .scaleLinear()
      .domain(
        d3.extent(
          data.filter((d) => d.name === selectedCountry),
          (d) => +d.dollar_price
        )
      )
      .range([height, 0])
      .nice();

    svg
      .append('g')
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('text').attr('color', '#555555'))
      .selectAll('.tick line')
      .attr('stroke', '#777777')
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('y', -20)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .attr('color', '#999999')
          .text('Dollar Price')
      );

    svg
      .append('path')
      .datum(data.filter((d) => d.name === selectedCountry))
      .transition()
      .duration(800)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d) => x(dateFormat(d.date)))
          .y((d) => y(+d.dollar_price))
      );
  }, [data, selectedCountry]);

  return <div ref={chartRef}></div>;
};

export default Chart;
