import isLoadingReducer from './isLoadingReducer';
import placesReducer from './placesReducer';
import carriersReducer from './carriersReducer';
import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';

const allReducers = combineReducers({
  isLoading: isLoadingReducer,
  places: placesReducer,
  carriers: carriersReducer,
  currency: currencyReducer,
});

export default allReducers;
