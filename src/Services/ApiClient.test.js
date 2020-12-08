import ApiClient from './ApiClient';

const mocks = {
  query: 'london',
  origin: 'LOND-sky',
  outbound: '2021-08-23',
  inbound: '2021-08-27',
  mockFetchGetFlights: jest.fn().mockReturnValue(
    Promise.resolve({
      Quotes: [
        {
          QuoteId: 1,
          MinPrice: 575.0,
          Direct: false,
          OutboundLeg: {
            CarrierIds: [1755],
            OriginId: 65655,
            DestinationId: 40099,
            DepartureDate: '2020-08-23T00:00:00',
          },
          InboundLeg: {
            CarrierIds: [1755],
            OriginId: 40099,
            DestinationId: 65698,
            DepartureDate: '2020-08-27T00:00:00',
          },
          QuoteDateTime: '2020-06-17T06:19:00',
        },
      ],
    })
  ),
};

// getPlace api tests

describe('get places fetch tests', () => {
  it('should recieve a list of valid airports', () => {
    return ApiClient.getPlace(mocks.query, mocks.mockFetchGetPlace).then(
      (data) => {
        expect(data.Places.length).not.toBe(0);
      }
    );
  });

  it('should recieve a valid placeName property', () => {
    return ApiClient.getPlace(mocks.query, mocks.mockFetchGetPlace).then(
      (data) => {
        expect(data.Places[0].PlaceName).toEqual('London');
      }
    );
  });

  it('should recieve a valid PlaceId property', () => {
    return ApiClient.getPlace(mocks.query, mocks.mockFetchGetPlace).then(
      (data) => {
        expect(data.Places[0].PlaceId).toEqual('LOND-sky');
      }
    );
  });
});

// get flights tests

describe('get flights fetch tests', () => {
  it('should should call the inner fetch function', () => {
    return ApiClient.getFlights(
      mocks.origin,
      mocks.outbound,
      mocks.inbound,
      'GBP',
      mocks.mockFetchGetFlights
    ).then((data) => {
      expect(mocks.mockFetchGetFlights.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
