import React from 'react';
import logo from './assets/Plane.svg';
import ApiClient from './Services/ApiClient';
import './App.css';
import SearchForm from './Components/SearchForm/searchForm';
import FlightList from './Containers/FlightList/flightList';
import helpers from './helpers';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, getPlaces, getCarriers, setCurrency, setSearchParams, setMatchedResults } from './Actions';
function App() {
  // const [matched, setMatched] = useState([]);
  // Redux items
  const loading = useSelector((state) => state.isLoading);
  const searchParams = useSelector((state) => state.searchParams);
  const currentCurrency = useSelector((state) => state.currency);
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
    dispatch(getPlaces(quotesA.places, quotesB.places)); // dispatch is a redux function that gets the named reducer and sets the state.
    dispatch(getCarriers(quotesA.carriers, quotesB.carriers));
    dispatch(setMatchedResults(quotesA, quotesB));

    // setMatched(helpers.matchFlights(quotesA, quotesB)); // as this is passed through props fine to leave outside redux.
    dispatch(isLoading());
  };
  const changeCurrency = (currency) => { 
    
    if (searchParams !== null && currency !== currentCurrency) {
    searchFlights(searchParams.fmtFrom1,searchParams.fmtFrom2, searchParams.departDate, searchParams.returnDate, currency);
    dispatch(setSearchParams({fmtFrom1: searchParams.fmtFrom1, fmtFrom2: searchParams.fmtFrom2, departDate: searchParams.departDate, returnDate: searchParams.returnDate, currency: currency}))
  };
    if (currency !== currentCurrency)  {dispatch(setCurrency(currency))}; 
    };

  return (
    <div className="App-body">
      <div className="App">
        <header className="App-header">
        <div className="Currency-buttons">
          <div className={useSelector(state => state.currency) === "GBP"? "selected" : "unselected"} onClick={() => changeCurrency("GBP")}>&nbsp;£&nbsp;</div>
          <div className={useSelector(state => state.currency) === "USD"? "selected" : "unselected"} onClick={() => changeCurrency("USD")}>&nbsp;$&nbsp;</div>
          <div className={useSelector(state => state.currency) === "EUR"? "selected" : "unselected"} onClick={() => changeCurrency("EUR")}>&nbsp;€&nbsp;</div>
        </div>


        </header>
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
  );
}

export default App;
