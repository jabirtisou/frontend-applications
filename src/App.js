import { getData } from './fetch';
import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';

function App() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Argentina');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className='container'>
      <h1>Big mac price index line chart per country</h1>
      <select
        name='country'
        id='country'
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option>Select Country</option>
        {[...new Set(data.map((d) => d.name))].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      {data && (
        <Chart
          data={data}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  );
}

export default App;
