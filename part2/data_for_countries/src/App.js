import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  let countryListElement;

  useEffect(() => {
    console.log('fetching data');
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    setCountryList(
      event.target.value.length === 0
        ? []
        : data.filter((x) =>
            x.name.common
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
    );
  };

  const getWeatherData = async (country) => {
    const { capitalInfo } = country;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    return response;
  };

  const handleShowClick = (event, country) => {
    event.preventDefault();
    setCountryList([country]);
  };

  useEffect(() => {
    if (countryList.length === 1) {
      getWeatherData(countryList[0])
        .then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [countryList]);

  if (countryList.length > 10) {
    countryListElement = <p>Too many matches, specify another filter</p>;
  } else if (countryList.length > 1 && countryList.length < 10) {
    countryListElement = countryList.map((x) => {
      return (
        <p key={x.name.common}>
          {x.name.common}
          <button type='button' onClick={(e) => handleShowClick(e, x)}>
            show
          </button>
        </p>
      );
    });
  } else if (countryList.length === 1) {
    const country = countryList[0];
    const lang = Object.values(country.languages);
    countryListElement = (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {lang.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          width='100px'
          alt={`${country.name.common} flag`}
        />
        <h2>Weather in {country.capital[0]}</h2>
        {!weatherData.main ? null : (
          <>
            <p>
              <strong>temperature: </strong> {weatherData.main.temp} Celsius
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p>
              <strong>wind: </strong> {weatherData.wind.speed} m/s
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div>
        <label htmlFor='search'>
          find countries{' '}
          <input type='text' id='search' onChange={handleInputChange} />
        </label>
      </div>
      <div>{countryListElement}</div>
    </div>
  );
}

export default App;
