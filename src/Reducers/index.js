import isLoadingReducer from './isLoadingReducer';
import placesReducer from './placesReducer';
import carriersReducer from './carriersReducer';
import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';
import searchParamsReducer from './searchParamsReducer';
import matchedFlightsReducer from './matchedFlightsReducer';
import directFlightsReducer from './directFlightsReducer';

const allReducers = combineReducers({
  isLoading: isLoadingReducer,
  places: placesReducer,
  carriers: carriersReducer,
  currency: currencyReducer,
  searchParams: searchParamsReducer,
  matchedFlights: matchedFlightsReducer,
  directFlights: directFlightsReducer,
});

export default allReducers;
