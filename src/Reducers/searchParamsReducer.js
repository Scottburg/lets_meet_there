const searchParamsReducer = (state = null, action) => {
  switch (action.type) {
    case 'home/setSearchParams':
      return action.payload;
    default:
      return state;
  }
};

export default searchParamsReducer;
