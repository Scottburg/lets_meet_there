const isLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'home/isLoading':
      return !state;
    default:
      return state;
  }
};

export default isLoadingReducer;
