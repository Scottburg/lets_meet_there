import ApiClient, { fetchRequest } from './ApiClient';

const mocks = {
  query: 'london',
  origin: 'LOND-sky',
  outbound: '2020-08-23',
  inbound: '2020-08-27',
  destination: 'LOND-sky',
  mockFetchGetFlights: jest.fn().mockReturnValue(Promise.resolve({

      Quotes: [
        {
          "QuoteId": 1,
          "MinPrice": 575.0,
          "Direct": false,
          "OutboundLeg": {
              "CarrierIds": [
                  1755
              ],
              "OriginId": 65655,
              "DestinationId": 40099,
              "DepartureDate": "2020-08-23T00:00:00"
          },
          "InboundLeg": {
              "CarrierIds": [
                  1755
              ],
              "OriginId": 40099,
              "DestinationId": 65698,
              "DepartureDate": "2020-08-27T00:00:00"
          },
          "QuoteDateTime": "2020-06-17T06:19:00"
        }
      ]

  })),
  mockFetchGetPlace: jest.fn().mockReturnValue(Promise.resolve({
    Places: [
      {
        "PlaceId": "LOND-sky",
        "PlaceName": "London",
        "CountryId": "UK-sky",
        "RegionId": "",
        "CityId": "LOND-sky",
        "CountryName": "United Kingdom"
      },
    ]
  })),
  mockFetch: jest.fn().mockReturnValue(Promise.resolve({json: () => Promise.resolve({})}))
}

describe('fetchRequest tests', () => {
  it('should run a fetch request', () => {
    return fetchRequest('testUrl', {}, mocks.mockFetch).then(data => {
      expect(mocks.mockFetch.mock.calls.length).toBe(1);
      expect(mocks.mockFetch).toBeCalledWith('testUrl', {});
    });
    
  })

  it('should run the fetch request with the correct URL and options object', () => {
    return fetchRequest('testUrl', {}, mocks.mockFetch).then(data => {
      expect(mocks.mockFetch).toBeCalledWith('testUrl', {});
    });
  })
})

describe('get places fetch tests', () => {
  // getPlace api tests
  it('should recieve a list of valid airports', () => {
    return ApiClient.getPlace(mocks.query ,mocks.mockFetchGetPlace).then(data => {
      expect(data.Places.length).toEqual(1);
    });
  })

  it('should recieve a valid placeName property', () => {
    return ApiClient.getPlace(mocks.query ,mocks.mockFetchGetPlace).then(data => {
      expect(data.Places[0].PlaceName).toEqual('London');
    });
  })

  it('should recieve a valid PlaceId property', () => {
    return ApiClient.getPlace(mocks.query ,mocks.mockFetchGetPlace).then(data => {
      expect(data.Places[0].PlaceId).toEqual('LOND-sky');
    });
  });
  
})


// get flights tests

describe('get flights fetch tests', () => {
  it('should should call the inner fetch function', () => {
    return ApiClient.getFlights(mocks.origin, mocks.outbound, mocks.inbound ,mocks.mockFetchGetFlights).then(data => {
      expect(mocks.mockFetchGetFlights.mock.calls.length).toBeGreaterThan(0);
    });
  });

  it('should have a price/direct and carrierId property', () => {
    return ApiClient.getFlights(mocks.origin, mocks.outbound, mocks.inbound ,mocks.mockFetchGetFlights).then(data => {
        expect(data.Quotes[0].MinPrice).toBeDefined();
        expect(data.Quotes[0].Direct).toBeDefined();
        expect(data.Quotes[0].OutboundLeg.CarrierIds.length).toBeGreaterThan(0);
        expect(data.Quotes[0].InboundLeg.CarrierIds.length).toBeGreaterThan(0);
    });
  });
  
});

// get fav flights

describe('get fav flights fetch tests', () => {
  it('should should call the inner fetch function', () => {
    return ApiClient.getFavFlights(mocks.origin, mocks.destination, mocks.outbound, mocks.inbound ,mocks.mockFetchGetFlights).then(data => {
      expect(mocks.mockFetchGetFlights.mock.calls.length).toBeGreaterThan(0);
    });
  });

  it('should have a price/direct and carrierId property', () => {
    return ApiClient.getFavFlights(mocks.origin, mocks.destination, mocks.outbound, mocks.inbound ,mocks.mockFetchGetFlights).then(data => {
        expect(data.Quotes[0].MinPrice).toBeDefined();
        expect(data.Quotes[0].Direct).toBeDefined();
        expect(data.Quotes[0].OutboundLeg.CarrierIds.length).toBeGreaterThan(0);
        expect(data.Quotes[0].InboundLeg.CarrierIds.length).toBeGreaterThan(0);
    });
  });
});