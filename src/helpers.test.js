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

const flightData = {
  "Quotes": [
      {
          "QuoteId": 1,
          "MinPrice": 62.0,
          "Direct": true,
          "OutboundLeg": {
              "CarrierIds": [
                  1090
              ],
              "OriginId": 82582,
              "DestinationId": 82398,
              "DepartureDate": "2020-08-20T00:00:00"
          },
          "InboundLeg": {
              "CarrierIds": [
                  1090
              ],
              "OriginId": 82398,
              "DestinationId": 82582,
              "DepartureDate": "2020-08-23T00:00:00"
          },
          "QuoteDateTime": "2020-06-19T17:32:00"
      }
  ],
  "places": [
      {
          "PlaceId": 66270,
          "IataCode": "LTN",
          "Name": "London Luton",
          "Type": "Station",
          "SkyscannerCode": "LTN",
          "CityName": "London",
          "CityId": "LOND",
          "CountryName": "United Kingdom"
      },
      {
          "PlaceId": 82398,
          "IataCode": "STN",
          "Name": "London Stansted",
          "Type": "Station",
          "SkyscannerCode": "STN",
          "CityName": "London",
          "CityId": "LOND",
          "CountryName": "United Kingdom"
      },
      {
          "PlaceId": 82582,
          "IataCode": "SXF",
          "Name": "Berlin Schoenefeld",
          "Type": "Station",
          "SkyscannerCode": "SXF",
          "CityName": "Berlin",
          "CityId": "BERL",
          "CountryName": "Germany"
      },
      {
          "PlaceId": 84892,
          "IataCode": "TXL",
          "Name": "Berlin Tegel",
          "Type": "Station",
          "SkyscannerCode": "TXL",
          "CityName": "Berlin",
          "CityId": "BERL",
          "CountryName": "Germany"
      }
  ],
  "Carriers": [
      {
          "CarrierId": 1090,
          "Name": "Ryanair"
      },
      {
          "CarrierId": 1878,
          "Name": "Wizz Air"
      }
  ],
  "Currencies": [
      {
          "Code": "EUR",
          "Symbol": "€",
          "ThousandsSeparator": ".",
          "DecimalSeparator": ",",
          "SymbolOnLeft": false,
          "SpaceBetweenAmountAndSymbol": true,
          "RoundingCoefficient": 0,
          "DecimalDigits": 2
      }
  ]
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

//getCityName 
describe('tests for getCityName', () => {
  it('should return the city name', () => {
    expect(helpers.getCityName(flightData, flightData.Quotes[0].OutboundLeg.OriginId)[0].CityName).toEqual('Berlin')
  })
})

//get Location tests
describe('tests for getLocation', () => {
  it('should return the location object', () => {
    expect(helpers.getLocation(flightData, flightData.Quotes[0].OutboundLeg.DestinationId)[0]).toEqual({
      PlaceId: 82398,
      IataCode: 'STN',
      Name: 'London Stansted',
      Type: 'Station',
      SkyscannerCode: 'STN',
      CityName: 'London',
      CityId: 'LOND',
      CountryName: 'United Kingdom'
    })
  })
})
