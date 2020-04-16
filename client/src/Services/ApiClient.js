const BASE_URL =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/';

let fetchRequest = (url, options) => {
  return (
    fetch(url, options)
      .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
      .then((res) => res.json())
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((err) => {
        console.log(err);
      })
  );
};

export default {
  getFlights: (origin, destination, outbound, inbound) => {
    return fetchRequest(
      `${BASE_URL}${origin}/${destination}/${outbound}/${inbound}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      }
    );
  },
};
