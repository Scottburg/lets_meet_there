const isLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'ISLOADING':
      return !state;
    default:
      return state;
  }
};

export default isLoadingReducer;
