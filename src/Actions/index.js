export const isLoading = () => {
  return {
    type: 'home/isLoading',
  };
};

export const getPlaces = (quotesA, quotesB) => {
  return {
    type: 'home/getPlaces',
    quotesA: quotesA,
    quotesB: quotesB,
  };
};

export const getCarriers = (quotesA, quotesB) => {
  return {
    type: 'home/getCarriers',
    quotesA: quotesA,
    quotesB: quotesB,
  };
};


export const addToFavourites = (requestData) => {
  return {
    type: 'addToFavourites',
    payload: requestData
  }
}

export const addUser = (user) => {
  return {
    type: 'addUser',
    payload: user
  }
}