

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
    return !fetch ? fetchRequest(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/EUR/en-US/${origin}/anywhere/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': "f9f3db2cf1mshbc0937b057b9cbfp120b46jsn33afb62f37b4",
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
    return !fetch ? fetchRequest(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${query}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': "f9f3db2cf1mshbc0937b057b9cbfp120b46jsn33afb62f37b4",
      },
    }) : fetch();
  },
};
