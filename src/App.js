import React from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import Header from './Components/Header/header';
import helpers from './helpers';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, getPlaces, getCarriers, setMatchedResults } from './Actions';


function App() {
  // Redux items
  const loading = useSelector((state) => state.isLoading);
  const searchParams = useSelector((state) => state.searchParams);
  const matched = useSelector((state) => state.matchedFlights);
  const dispatch = useDispatch();

  const getPlace = async (query) => {
    return ApiClient.getPlace(query).then((res) => {
      return helpers.placeId(res, query);
    });
  };

  const searchFlights = async (from1, from2, departDate, returnDate, currency) => {
    dispatch(isLoading());
    const quotesA = await ApiClient.getFlights(from1, departDate, returnDate, currency);
    const quotesB = await ApiClient.getFlights(from2, departDate, returnDate, currency);
    console.log(quotesA)
    if (quotesA.quotes !== undefined || quotesA.quotes !== undefined){
    dispatch(getPlaces(quotesA.places, quotesB.places)); // dispatch is a redux function that gets the named reducer and sets the state.
    dispatch(getCarriers(quotesA.carriers, quotesB.carriers));
    dispatch(setMatchedResults(quotesA, quotesB));
    dispatch(isLoading());
  };
  };
  
  return (
    <div className="App-body">
      <div className="App">
      <Header
      searchFlights={searchFlights}>
      </Header>
      
        <SearchForm
          searchFlights={searchFlights}
          getPlace={getPlace}
        ></SearchForm>
        <div>
          {loading ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : matched.length ? (
            <FlightList matchedFlights={matched}></FlightList>
          ) : searchParams !== null ? (<div>No flights found</div>) : (<div> </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
