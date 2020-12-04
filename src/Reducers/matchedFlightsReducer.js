import helpers from '../helpers';

const matchedFlightsReducer = (state = [], action) => {
  switch (action.type) {
    case 'home/setMatchedResults':
      return action.quotesA && action.quotesB? helpers.matchFlights(action.quotesA, action.quotesB) : [];
    default:
      return state;
  }
};

export default matchedFlightsReducer;
