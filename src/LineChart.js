import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Chart = ({ data, selectedCountry, handleCountryChange }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    //set width, height and margins
    const margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const width = 1150 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const dateFormat = d3.timeParse('%Y-%m-%d');

    // Delete current charts
    d3.select(chartRef.current).selectAll('*').remove();

    // append svg to the chart div and translate it
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //function to define the x scale and map data to width of svg
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => dateFormat(d.date)))
      .range([0, width])
      .nice();

    // append x axis to svg
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

    //function to define the y scale and map data to height of svg
    const y = d3
      .scaleLinear()
      .domain(
        d3.extent(
          data.filter((d) => d.name === selectedCountry),
          (d) => d.dollar_price
        )
      )
      .range([height, 0])
      .nice();

    // append y axis to svg
    svg
      .append('g')
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('text').attr('color', '#555555'))
      .selectAll('.tick line')
      .attr('stroke', '#777777');

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
          .y((d) => y(d.dollar_price))
      );
  }, [data, selectedCountry]);

  return (
    <div className='container'>
      <h1>Big Mac Dollar Price Line Chart</h1>
      <select
        name='country'
        id='country'
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value=''>Select Country</option>
        {[...new Set(data.map((d) => d.name))].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart;
