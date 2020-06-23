export let fetchRequest = (url, options, testFetch) => {
  return !testFetch ? fetch(url, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    }) : testFetch(url, options)
};
 
export default {
  getFlights: (origin, outbound, inbound, fetch) => {
    return !fetch ? fetchRequest(
      `${process.env.REACT_APP_BROWSE_QUOTES}${origin}/anywhere/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_API_HOST,
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      }
    ).then((data) => {
      const quote = {
        quotes: data.Quotes,
        places: data.Places,
        carriers: data.Carriers,
      };
      return quote;
    }) : fetch();
  },
  getPlace: (query, fetch) => {
    return !fetch ? fetchRequest(`${process.env.REACT_APP_AUTOSUGGEST}${query}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    }) : fetch();
  },
  getFavFlights: async (origin, destination, outbound, inbound, fetch) => {
    return !fetch ? fetchRequest(
      `${process.env.REACT_APP_BROWSE_QUOTES}${origin}/${destination}/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_API_HOST,
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      }
    ).then((data) => {
      const quote = {
        quotes: data.Quotes,
        places: data.Places,
        carriers: data.Carriers,
      };
      return quote;
    }) : fetch();
  }
};
