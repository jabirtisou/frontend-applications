import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, year, years, handleChange }) => {
  const chart = useRef(null);

  useEffect(() => {
    d3.select(chart.current).selectAll('*').remove();

    //set width, height and margins
    const margin = { top: 40, bottom: 40, left: 120, right: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // append svg to the chart div and translate it
    const svg = d3
      .select(chart.current)
      .append('svg')
      .style('background-color', '#262830')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //function to define the y scale and map data to height of svg
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, height])
      .padding(0.4);

    svg.append('g').call(d3.axisLeft(y)); // append y axis to svg

    //function to define the x scale and map data to width of svg
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.dollar_price)])
      .range([0, width])
      .nice();

    // append x axis to svg
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // append rects to svg and set enter state
    const rects = svg.selectAll('rect').data(data);

    // update the state the on rects
    rects
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.name))
      .merge(rects)
      .transition()
      .duration(1000)
      .attr('width', (d) => x(d.dollar_price))
      .attr('height', y.bandwidth())
      .attr('fill', '#f7f7f7')
      .attr('stroke', '#fff')
      .attr('stroke-width', '0.5px');

    // set exit behaviour
    rects.exit().remove();
  }, [data]);

  return (
    <div>
      <h1>Big Mac Dollar Price Bar Chart</h1>
      <div className='year'>
        <p>Select a year: </p>
        <select value={year} onChange={handleChange}>
          {years &&
            years.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </select>
      </div>

      <div ref={chart}></div>
    </div>
  );
};

export default BarChart;
