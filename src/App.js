import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const SearchBar =({ onSearch }) =>{
  const [searchValue, setSearchValue] =useState("");
  const handleSearch =() => {
    onSearch(searchValue);
  };
  return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
  );
};

const WeatherCard =({ title, value }) => {
  return (
    <div className ="weather-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

const WeatherDisplay = ({city}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] =useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
  axios.get(`https://api.weatherapi.com/v1/current.json`, {
    params: {
    key:"235c96f36e464f4b99a133100242901",
    q: city,
    },
  })
  .then((response) => {
    setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data");
        alert('Failed to fetch weather data');
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [city]);

  return (
    <div className='weather-display'>
    {loading && <p>Loading data...</p>}
    {!loading && weatherData && (
      <div className='weather-cards'>
        <WeatherCard
        title="Temperature"
        value={`${weatherData.current.temp_c}°C`}
        />
         <WeatherCard
        title="Humidity"
        value={`${weatherData.current.humidity}%`}
        />
         <WeatherCard
        title="Condition"
        value={`${weatherData.current.condition?.text}`}
        />
         <WeatherCard
        title="Wind Speed"
        value={`${weatherData.current.wind_kph} km/h`}
        />
      </div>
    )}
    </div>
);
};

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };
  return (
    <div className='App'>
      <SearchBar onSearch={handleSearch}/>
      <WeatherDisplay city={city} />
    </div>
  );
}

export default WeatherApp;
