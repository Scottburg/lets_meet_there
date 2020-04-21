import React, { useState } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import { pickBy } from 'lodash';
import helpers from './helpers';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, getPlaces, getCarriers } from './Actions';
function App() {
  const [matched, setMatched] = useState([]);
  // Redux items
  const loading2 = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

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

  // const getFlights = (from, departDate, returnDate) {

  // }

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    dispatch(isLoading());
    const quotesA = await ApiClient.getFlights(from1, departDate, returnDate);
    const quotesB = await ApiClient.getFlights(from2, departDate, returnDate);
    dispatch(getPlaces(quotesA.places, quotesB.places)); // dispatch is a redux function that gets the named reducer and sets the state.
    dispatch(getCarriers(quotesA.carriers, quotesB.carriers));
    // const matchedflights = matchFlights(quotesA, quotesB);
    setMatched(matchFlights(quotesA, quotesB)); // as this is passed through props fine to leave outside redux.
    dispatch(isLoading());
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
          {loading2 ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : (
            <FlightList matchedFlights={matched}></FlightList>
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
