import './App.css';
import { getData, getLineData } from './fetch';
import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import Chart from './Chart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';

function App() {
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Argentina');
  const [year, setYear] = useState(2011);
  const years = [
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];

  const handleChange = (e) => {
    setYear(e.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    const fetchData = async (selectedYear) => {
      const data = await getData(+selectedYear);
      setBarData(data);
    };

    const fetchLineData = async () => {
      const data = await getLineData();
      setData(data);
    };
    fetchLineData();

    fetchData(year);
  }, [year]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/bar-chart'
            element={
              barData && (
                <BarChart
                  data={barData}
                  year={year}
                  years={years}
                  handleChange={handleChange}
                />
              )
            }
          />
          <Route
            path='/line-chart'
            element={
              data && (
                <Chart
                  handleCountryChange={handleCountryChange}
                  selectedCountry={selectedCountry}
                  data={data}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
