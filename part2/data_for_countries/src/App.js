import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [countryList, setCountryList] = useState([]);

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

  const handleShowClick = (event, country) => {
    event.preventDefault();
    setCountryList([country]);
  };

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
