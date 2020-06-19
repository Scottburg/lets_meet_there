import isLoadingReducer from './isLoadingReducer';
import placesReducer from './placesReducer';
import carriersReducer from './carriersReducer';
import favouritesReducer from './favouritesReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoading: isLoadingReducer,
  places: placesReducer,
  carriers: carriersReducer,
  favourites: favouritesReducer
});

export default allReducers;
