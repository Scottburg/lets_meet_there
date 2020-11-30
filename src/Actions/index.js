export const isLoading = () => {
  return {
    type: 'home/isLoading',
  };
};
export const directFlights = () => {
  return {
    type: 'home/directFlights',
  };
};

export const setCurrency = (currency) => {
  return {
    type: 'home/setCurrency',
    payload: currency,
  };
};
export const setSearchParams = (searchParams) => {
  return {
    type: 'home/setSearchParams',
    payload: searchParams,
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

export const setMatchedResults = (quotesA, quotesB) => {
  return {
    type: 'home/setMatchedResults',
    quotesA: quotesA,
    quotesB: quotesB,
  };
};
