const currencyReducer = (state = "GBP", action) => {
  switch (action.type) {
    case 'home/setCurrency':
      return action.payload;
    default:
      return state;
  }
};

export default currencyReducer;

