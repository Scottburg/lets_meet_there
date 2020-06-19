const initialState = {
  favouritesList: []
}

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addToFavourites':
      return {
        ...state,
        favouritesList: [...state.favouritesList, action.payload]
      };
    default:
      return state;
  }
};

export default favouritesReducer;
