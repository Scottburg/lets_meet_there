import helpers from '../helpers';

const placesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GETPLACES':
      return helpers.createDict(action.quotesA, action.quotesB, 'PlaceId');
    default:
      return state;
  }
};

export default placesReducer;
