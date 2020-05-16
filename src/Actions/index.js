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
