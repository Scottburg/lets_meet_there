export const isLoading = () => {
  return {
    type: 'ISLOADING',
  };
};

export const getPlaces = (quotesA, quotesB) => {
  return {
    type: 'GETPLACES',
    quotesA: quotesA,
    quotesB: quotesB,
  };
};

export const getCarriers = (quotesA, quotesB) => {
  return {
    type: 'GETCARRIERS',
    quotesA: quotesA,
    quotesB: quotesB,
  };
};
