import React, { useState } from 'react';
import './HomePage.styles.scss';
import logo from '../../assets/Plane.svg';
import ApiClient from '../../Services/ApiClient';
import './HomePage.styles.scss';
import SearchForm from '../../Components/SearchForm/searchForm';
import FlightList from '../FlightList/flightList';
import helpers from '../../helpers';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, getPlaces, getCarriers } from '../../Actions';

export default function HomePage() {

  const [matched, setMatched] = useState([]);
  // Redux items
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const getPlace = async (query) => {
    return ApiClient.getPlace(query).then((res) => {
      return helpers.placeId(res, query);
    });
  };

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    dispatch(isLoading());
    const quotesA = await ApiClient.getFlights(from1, departDate, returnDate);
    const quotesB = await ApiClient.getFlights(from2, departDate, returnDate);
    dispatch(getPlaces(quotesA.places, quotesB.places)); // dispatch is a redux function that gets the named reducer and sets the state.
    dispatch(getCarriers(quotesA.carriers, quotesB.carriers));
    setMatched(helpers.matchFlights(quotesA, quotesB)); // as this is passed through props fine to leave outside redux.
    dispatch(isLoading());
  };
  return (
    <div className="App-body">
      <div className="App">
        <header className="App-header"></header>
        <h1>Search for a place to meet</h1>

        <SearchForm
          searchFlights={searchFlights}
          getPlace={getPlace}
        ></SearchForm>
        <div>
          {loading ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : (
            <FlightList matchedFlights={matched}></FlightList>
          )}
        </div>
      </div>
    </div>
  )
}
