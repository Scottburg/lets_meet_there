import React, { useState } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import { pickBy } from 'lodash';

function App() {
  const quoteFormat = {
    quotes: [],
    places: [],
    carriers: [],
  };
  const [loading, setLoading] = useState(false);
  // const [quotes, setQuotes] = useState(quoteFormat);
  // const [quotes2, setQuotes2] = useState(quoteFormat);
  const [matched, setMatched] = useState([]);
  const [places, setPlaces] = useState({});
  const [carriers, setCarriers] = useState({});

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    setLoading(true);
    // const loading = [true, true];
    const search1 = ApiClient.getFlights(from1, departDate, returnDate).then(
      (data) => {
        const quote = {
          quotes: data.Quotes,
          places: data.Places,
          carriers: data.Carriers,
        };
        // setQuotes(quote);
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
        // setQuotes2(quote);
        return quote;
      }
    );
    const quotesA = await search1;
    const quotesB = await search2;
    const allPlaces = createDict(quotesA.places, quotesB.places, 'PlaceId');
    const allCarriers = createDict(
      quotesA.carriers,
      quotesB.carriers,
      'CarrierId'
    );

    setPlaces(allPlaces);
    setCarriers(allCarriers);
    setMatched(matchFlights(quotesA, quotesB)); // Careful quotes and setQuotes may have not been set at this point.
    setLoading(false);
  };

  const ArrToDict = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  const createDict = (arrOfObj1, arrOfObj2, key) => {
    let combined = [...arrOfObj1, ...arrOfObj2];
    console.log('createDict -> combined', combined[0][key]);

    let combined2 = Array.from(
      new Set(combined.map((a) => a[key])) // creates a new array of just the placeIDs and converts it to a set (no duplicates)
    ).map((num) => {
      // then maps this new array creating another new array of the unique placeID's from the original array.
      return combined.find((a) => a[key] === num); // find returns the  first element that has the same PlaceId
    });
    console.log('createDict -> combined2', combined2);
    return ArrToDict(combined2, key);
  };

  // Matched results format {
  //   1234: { quote1: {}, quote2: {} },
  //   5678: { quote1: {}, quote2: {} },
  // }

  const matchFlights = (quotes, quotes2) => {
    const unionSet = {};

    for (let i = 0; i < quotes.quotes.length; i++) {
      unionSet[quotes.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes.quotes[i].OutboundLeg.DestinationId][0][0].push(
            quotes.quotes[i]
          )
        : (unionSet[quotes.quotes[i].OutboundLeg.DestinationId] = [
            [[quotes.quotes[i]]],
            [],
          ]);
    }
    for (let i = 0; i < quotes2.quotes.length; i++) {
      unionSet[quotes2.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes2.quotes[i].OutboundLeg.DestinationId][1].push([
            quotes2.quotes[i],
          ])
        : (unionSet[quotes2.quotes[i].OutboundLeg.DestinationId] = [
            [],
            [[quotes2.quotes[i]]],
          ]);
    }
    const filteredSet = pickBy(
      unionSet,
      (item) => item[0].length && item[1].length
    );
    return filteredSet;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{loading ? <h1>LOADING....</h1> : <h1>LOADED</h1>}</div>
        {loading ? null : console.log(places)}
        <SearchForm searchFlights={searchFlights}></SearchForm>
        <FlightList
          matchedFlights={matched}
          places={places}
          carriers={carriers}
        ></FlightList>
      </header>
    </div>
  );
}

export default App;
