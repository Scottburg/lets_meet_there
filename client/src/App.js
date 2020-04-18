import React, { useState } from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import { pickBy } from 'lodash';

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
    let location = toTitleCase(query);

    for (const place of res.Places) {
      if (location === place.PlaceName) {
        return place.PlaceId;
      }
    }
    return res.Places[0].PlaceId;
  };
  const toTitleCase = (str) => {
    const resStr = str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    return resStr;
  };
  // get all the cityIDs and go with the most numerous
  // if result is just one go with the airport ID

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
    const allPlaces = createDict(quotesA.places, quotesB.places, 'PlaceId');
    const allCarriers = createDict(
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

    let combined2 = Array.from(
      new Set(combined.map((a) => a[key])) // creates a new array of just the placeIDs and converts it to a set (no duplicates)
    ).map((num) => {
      // then maps this new array creating another new array of the unique placeID's from the original array.
      return combined.find((a) => a[key] === num); // find returns the  first element that has the same PlaceId
    });
    return ArrToDict(combined2, key);
  };
  // const sortFlights = (matchedFlights) => { //TODO Not sure how to order it as its a dictionary by placeId
  //   // match[0][0].MinPrice + match[0][0].MinPrice;
  // };

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
    return filteredSet;
  };

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
