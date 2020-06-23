export let fetchRequest = (url, options, testFetch) => {
  return !testFetch ? fetch(url, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    }) : testFetch(url, options)
};
 
export default {
  getFlights: (origin, outbound, inbound, testFetch) => {
    return !testFetch ? fetchRequest(
      `${process.env.REACT_APP_BROWSE_QUOTES}${origin}/anywhere/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
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
    }) : testFetch();
  },
  getPlace: (query, testFetch) => {
    return !testFetch ? fetchRequest(`${process.env.REACT_APP_AUTOSUGGEST}${query}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    }) : testFetch();
  },
  getFavFlights: async (origin, destination, outbound, inbound, testFetch) => {
    return !testFetch ? fetchRequest(
      `${process.env.REACT_APP_BROWSE_QUOTES}${origin}/${destination}/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
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
    }) : testFetch();
  }
};
