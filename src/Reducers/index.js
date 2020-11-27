import isLoadingReducer from './isLoadingReducer';
import placesReducer from './placesReducer';
import carriersReducer from './carriersReducer';
import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';
import searchParamsReducer from './searchParamsReducer';
import matchedFlightsReducer from './matchedFlightsReducer';

const allReducers = combineReducers({
  isLoading: isLoadingReducer,
  places: placesReducer,
  carriers: carriersReducer,
  currency: currencyReducer,
  searchParams: searchParamsReducer,
  matchedFlights: matchedFlightsReducer,
});

export default allReducers;
