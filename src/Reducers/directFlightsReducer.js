const directFlightsReducer = (state = false, action) => {
  switch (action.type) {
    case 'home/directFlights':
      return !state;
    default:
      return state;
  }
};

export default directFlightsReducer;
