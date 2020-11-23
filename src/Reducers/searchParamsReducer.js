const searchParamsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'home/setSearchParams':
      return action.payload;
    default:
      return state;
  }
};

export default searchParamsReducer;
