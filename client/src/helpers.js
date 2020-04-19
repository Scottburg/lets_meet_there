const ArrToDict = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export default {
  toTitleCase: (str) => {
    const resStr = str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    return resStr;
  },
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
};
