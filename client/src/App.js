import React, { useState } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';

function App() {
  const quoteFormat = {
    quotes: [],
    places: [],
    carriers: [],
  };
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState(quoteFormat);
  const [quotes2, setQuotes2] = useState(quoteFormat);
  const [matched, setMatched] = useState([]);

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    setLoading(true);
    const loading = [true, true];
    const search1 = ApiClient.getFlights(from1, departDate, returnDate).then(
      (data) => {
        const quote = {
          quotes: data.Quotes,
          places: data.Places,
          carriers: data.Carriers,
        };
        setQuotes(quote);
        console.log('FIRST!!!');
        loading[1] ? (loading[0] = false) : setLoading(false);
        return quote;
      }
    );
    const search2 = ApiClient.getFlights(from2, departDate, returnDate).then(
      (data) => {
        const quote = {
          quotes: data.Quotes,
          places: data.Places,
          carriers: data.Carriers,
        };
        setQuotes2(quote);
        console.log('SECOND');
        loading[0] ? (loading[1] = false) : setLoading(false);
        return quote;
      }
    );
    const quotesA = await search1;
    const quotesB = await search2;
    console.log('THIRD');

    matchFlights(quotesA, quotesB); // Careful quotes and setQuotes may have not been set at this point.
  };

  const matchFlights = (quotes, quotes2) => {
    console.log(quotes.quotes[0].OutboundLeg.DestinationId);
    console.log(quotes2.quotes);
    console.log(quotes2.quotes.length);
    const unionSet = [];

    // each union item should be {quote: {quoteId: 1.... OutboundLeg{ DestinationId: 90711}},quote2:{quoteId: 58.... OutboundLeg{ DestinationId: 90711 }}}
    //{
    //   1234: { quote1: {}, quote2: {} },
    //   5678: { quote1: {}, quote2: {} },
    // }
    for (let i = 0; i < quotes.quotes.length; i++) {
      console.log(quotes.quotes[i].OutboundLeg.DestinationId);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => matchFlights(quotes, quotes2)}> Test</button>
        <img src={logo} className="App-logo" alt="logo" />
        <div>{loading ? <h1>LOADING....</h1> : <h1>LOADED</h1>}</div>
        {loading ? null : console.log(quotes, quotes2)}
        <SearchForm searchFlights={searchFlights}></SearchForm>
      </header>
    </div>
  );
}

export default App;
