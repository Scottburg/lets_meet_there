import React, { useState, useEffect } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState({});

  useEffect(() => {
    ApiClient.getFlights(
      'LOND-sky',
      'anywhere',
      '2020-05-01',
      '2020-05-03'
    ).then((data) => {
      console.log(data.Quotes);
      setFlights([data]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{loading ? <h1>LOADING....</h1> : <h1>LOADED</h1>}</div>
        {loading ? null : console.log(flights[0].Quotes[0].MinPrice)}
      </header>
    </div>
  );
}

export default App;
