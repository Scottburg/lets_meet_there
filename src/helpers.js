import { pickBy } from 'lodash';

const ArrToDict = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const orderedCollection = (collection) => {
  const toArr = Object.keys(collection).map((key) => {
    return [key, ...collection[key]];
  });
  const sorted = toArr.sort((a, b) =>
    a[1][0][0].MinPrice + a[2][0][0].MinPrice >
    b[1][0][0].MinPrice + b[2][0][0].MinPrice
      ? 1
      : -1
  );
  return sorted;
};
const toTitleCase = (str) => {
  const resStr = str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  return resStr;
};

export default {
  createDict: (arrOfObj1, arrOfObj2, key) => {

    let combined = [...arrOfObj1, ...arrOfObj2];
    

    let combined2 = Array.from(
      new Set(combined.map((a) => a[key])) // creates a new array of just the placeIDs and converts it to a set (no duplicates)
    ).map((num) => {
      // then maps this new array creating another new array of the unique placeID's from the original array.
      return combined.find((a) => a[key] === num); // find returns the  first element that has the same PlaceId
    });
    return ArrToDict(combined2, key);
  },
  matchFlights: (quotes, quotes2) => {
    const unionSet = {};
  
    for (let i = 0; i < quotes.quotes.length; i++) {

      unionSet[quotes.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes.quotes[i].OutboundLeg.DestinationId][0][0].push(
            quotes.quotes[i]
          )
        : (unionSet[quotes.quotes[i].OutboundLeg.DestinationId] = [
            [[quotes.quotes[i]]], // because there may be more than one matches from quotes or quotes2, its a
            [], // This extra empty array is to maintain structure in the matched quote object
          ]);
    }
    for (let i = 0; i < quotes2.quotes.length; i++) {
      unionSet[quotes2.quotes[i].OutboundLeg.DestinationId]
        ? unionSet[quotes2.quotes[i].OutboundLeg.DestinationId][1].push([
            quotes2.quotes[i],
          ])
        : (unionSet[quotes2.quotes[i].OutboundLeg.DestinationId] = [
            [], // This extra empty array is to maintain structure in the matched quote object
            [[quotes2.quotes[i]]],
          ]);
    }
    const filteredSet = pickBy(
      unionSet,
      (item) => item[0].length && item[1].length
    );
    orderedCollection(filteredSet);
    return orderedCollection(filteredSet);
  },
  placeId: (res, query) => {
    if (res.Places.length === 0) return null;
    if (res.Places.length === 1) return res.Places[0].PlaceId;
    let location = toTitleCase(query);

    for (const place of res.Places) {
      if (location === place.PlaceName) {
        return place.PlaceId;
      }
    }
    return res.Places[0].PlaceId;
  },
  getCityName: (flightData, OriginId) => {
    return flightData.places.filter(place => place.PlaceId === OriginId) 
  },

  getLocation: (flightData, destinationId) => {
    return flightData.places.filter(place => place.PlaceId === destinationId)
  }
};
