import helpers from './helpers';
const quote = require('./testData/matchFlightDataQuote1.json');
const quote2 = require('./testData/matchFlightDataQuote2.json');
const {filteredSet} = require('./testData/matchFlightDataFilteredSet');
const res1 = require('./testData/placeIdRes.json');
const res2 = require('./testData/placeIdRes2.json');

// test createDict
const arrOfObj1 = [
  {PlaceId: 837, Name: "United Arab Emirates", Type: "Country", SkyscannerCode: "AE"},
  {PlaceId: 838, Name: "Afghanistan", Type: "Country", SkyscannerCode: "AF"},
  {PlaceId: 839, Name: "Antigua and Barbuda", Type: "Country", SkyscannerCode: "AG"}
];

const arrOfObj2 = [
  {PlaceId: 837, Name: "United Arab Emirates", Type: "Country", SkyscannerCode: "AE"},
  {PlaceId: 844, Name: "Albania", Type: "Country", SkyscannerCode: "AL"},
  {PlaceId: 845, Name: "Armenia", Type: "Country", SkyscannerCode: "AM"}
];

const key = 'PlaceId';

const finDict = {
  837: {PlaceId: 837, Name: "United Arab Emirates", Type: "Country", SkyscannerCode: "AE"},
  838: {PlaceId: 838, Name: "Afghanistan", Type: "Country", SkyscannerCode: "AF"},
  839: {PlaceId: 839, Name: "Antigua and Barbuda", Type: "Country", SkyscannerCode: "AG"},
  844: {PlaceId: 844, Name: 'Albania', Type: 'Country', SkyscannerCode: 'AL'},
  845: {PlaceId: 845, Name: 'Armenia', Type: 'Country', SkyscannerCode: 'AM'}
}

test('should return a dict of two arrays with the key as key', () => {
  //TODO: add tests to check edge cases
  expect(helpers.createDict(arrOfObj1, arrOfObj2, key)).toEqual(finDict);
});

// test matchFlights
test('should return an array of arrays, sorted by quote price', () => {
  //TODO: add tests to check edge cases
  expect(helpers.matchFlights(quote, quote2)).toEqual(filteredSet);
});

// test placeId
describe('something here', () => {
  const query1 = 'LONDON'
  const result1 = 'LOND-sky' //some number here 

  test('should return the PlaceId if the full query name is found', () => {
    expect(helpers.placeId(res1, query1)).toBe(result1);
  });

  const query2 = 'LOND';
  const result2 = 'LOND-sky'
  
  test('should return the PlaceId if partial query name is found', () => {
    expect(helpers.placeId(res2, query2)).toBe(result2);
  });

  const query3 = 3;
  const res3 = {Places: []};

  test('should return null if the not a valid query', () => {
    expect(helpers.placeId(res3, query3)).toBe(null);
  });
});
