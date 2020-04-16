import React, { useState, useEffect } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';

function App() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState({});
  const [quotes2, setQuotes2] = useState({});
  const [places, setPlaces] = useState({});
  const [carriers, setCarriers] = useState({});

  const searchFlights = (from1, from2, departDate, returnDate) => {
    setLoading(true);
    ApiClient.getFlights(from1, departDate + '', returnDate + '').then(
      (data) => {
        console.log(data);
        setQuotes([data.Quotes]);
        setPlaces([data.Places]);
        setCarriers([data.Carriers]);
        setLoading(false);
      }
    );
    console.log('HERE after first api call');
    ApiClient.getFlights(from2, departDate + '', returnDate + '').then(
      (data) => {
        console.log(data);
        setQuotes2([data.Quotes]);
        setPlaces([data.Places]);
        setCarriers([data.Carriers]);
        setLoading(false);
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{loading ? <h1>LOADING....</h1> : <h1>LOADED</h1>}</div>
        {loading ? null : console.log(quotes, quotes2, places, carriers)}
        <SearchForm searchFlights={searchFlights}></SearchForm>
      </header>
    </div>
  );
}

export default App;
