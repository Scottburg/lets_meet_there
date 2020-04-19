import React, { useState } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import { pickBy } from 'lodash';
import helpers from './helpers';

function App() {
  const [loading, setLoading] = useState(false);
  const [matched, setMatched] = useState([]);
  const [places, setPlaces] = useState({});
  const [carriers, setCarriers] = useState({});

  const getPlace = async (query) => {
    return ApiClient.getPlace(query).then((res) => {
      return placeId(res, query);
    });
  };

  const placeId = (res, query) => {
    if (res.Places.length === 0) return null;
    if (res.Places.length === 1) return res.Places[0].PlaceId;
    let location = helpers.toTitleCase(query);

    for (const place of res.Places) {
      if (location === place.PlaceName) {
        return place.PlaceId;
      }
    }
    return res.Places[0].PlaceId;
  };

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    setLoading(true);
    const search1 = ApiClient.getFlights(from1, departDate, returnDate).then(
      (data) => {
        const quote = {
          quotes: data.Quotes,
          places: data.Places,
          carriers: data.Carriers,
        };
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
        return quote;
      }
    );
    const quotesA = await search1;
    const quotesB = await search2;
    const allPlaces = helpers.createDict(
      quotesA.places,
      quotesB.places,
      'PlaceId'
    );
    const allCarriers = helpers.createDict(
      quotesA.carriers,
      quotesB.carriers,
      'CarrierId'
    );

    setPlaces(allPlaces);
    setCarriers(allCarriers);
    const matchedflights = matchFlights(quotesA, quotesB);
    setMatched(matchedflights);
    setLoading(false);
  };

  const matchFlights = (quotes, quotes2) => {
    const unionSet = {};

    for (let i = 0; i < quotes.quotes.length; i++) {
      unionSet[quotes.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes.quotes[i].OutboundLeg.DestinationId][0][0].push(
            quotes.quotes[i]
          )
        : (unionSet[quotes.quotes[i].OutboundLeg.DestinationId] = [
            [[quotes.quotes[i]]],
            [], // This extra empty array is to maintain structure in the matched quote object
          ]);
    }
    for (let i = 0; i < quotes2.quotes.length; i++) {
      unionSet[quotes2.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes2.quotes[i].OutboundLeg.DestinationId][1].push([
            quotes2.quotes[i],
          ])
        : (unionSet[quotes2.quotes[i].OutboundLeg.DestinationId] = [
            [], // This extra empty array is to maintain structure in the matched quote object
            [[quotes2.quotes[i]]],
          ]);
    }
    const filteredSet = pickBy(
      unionSet,
      (item) => item[0].length && item[1].length
    );
    orderedCollection(filteredSet);
    return orderedCollection(filteredSet);
  };

  const orderedCollection = (collection) => {
    const toArr = Object.keys(collection).map((key) => {
      return [key, ...collection[key]];
    });

    const sorted = toArr.sort((a, b) =>
      a[1][0][0].MinPrice + a[2][0][0].MinPrice >
      b[1][0][0].MinPrice + b[2][0][0].MinPrice
        ? 1
        : -1
    );
    return sorted;
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <h1>Search for a place to meet</h1>
        <SearchForm
          searchFlights={searchFlights}
          getPlace={getPlace}
        ></SearchForm>
        <div>
          {loading ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : (
            <FlightList
              matchedFlights={matched}
              places={places}
              carriers={carriers}
              getPlace={getPlace}
            ></FlightList>
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
