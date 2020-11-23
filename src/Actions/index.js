export const isLoading = () => {
  return {
    type: 'home/isLoading',
  };
};

export const setCurrency = (currency) => {
  return {
    type: 'home/setCurrency',
    payload: currency,
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
