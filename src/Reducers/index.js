import isLoadingReducer from './isLoadingReducer';
import placesReducer from './placesReducer';
import carriersReducer from './carriersReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoading: isLoadingReducer,
  places: placesReducer,
  carriers: carriersReducer,
  user: userReducer
});

export default allReducers;
