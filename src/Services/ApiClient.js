let fetchRequest = (url, options) => {
  return fetch(url, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export default {
  getFlights: (origin, outbound, inbound, fetch) => {
    return !fetch
      ? fetchRequest(
          `${process.env.REACT_APP_API_URL}${origin}/anywhere/${outbound}/${inbound}`,
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
        })
      : fetch();
  },
  getPlace: (query, fetch) => {
    return !fetch
      ? fetchRequest(`${process.env.REACT_APP_API_PLACE_URL}${query}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          },
        })
      : fetch();
  },
};
