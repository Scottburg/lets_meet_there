import helpers from '../helpers';

const matchedFlightsReducer = (state = [], action) => {
  switch (action.type) {
    case 'home/setMatchedResults':
      return helpers.matchFlights(action.quotesA, action.quotesB);
    default:
      return state;
  }
};

export default matchedFlightsReducer;
