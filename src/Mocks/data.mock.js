export const placeMocks = {
    65698: {
      CityId: "LOND",
      CityName: "London",
      CountryName: "United Kingdom",
      IataCode: "LHR",
      Name: "London Heathrow",
      PlaceId: 65698,
      SkyscannerCode: "LHR",
      Type: "Station"
    }
  };

export const quotes = [{
  QuoteId: 1,
  MinPrice: 349,
  Direct: false,
  OutboundLeg: {
    CarrierIds: [
      1090
    ],
    OriginId: 42414,
    DestinationId: 81495,
    DepartureDate: '2020-06-26T00:00:00'
  },
  InboundLeg: {
    CarrierIds: [
      1755
    ],
    OriginId: 81495,
    DestinationId: 42414,
    DepartureDate: '2020-06-29T00:00:00'
  },
  QuoteDateTime: '2020-06-17T21:12:00'
}];

export const carriers = [{

}];

export const flightOne = {
  Direct: false,
  InboundLeg: {
    CarrierIds: [1324],
    DepartureDate: "2020-06-27T00:00:00",
    DestinationId: 1165698,
    OriginId: 40920,
  },
  MinPrice: 213,
  OutboundLeg: {
    CarrierIds: [1324],
    DepartureDate: "2020-06-25T00:00:00",
    DestinationId: 40920,
    OriginId: 65698,
  },
  QuoteDateTime: "2020-06-17T23:03:00",
  QuoteId: 19
}

export const flightTwo = {
  Direct: false,
  InboundLeg: {
    CarrierIds: [1324],
    DepartureDate: "2020-06-27T00:00:00",
    DestinationId: 42414,
    OriginId: 40920
  },
  MinPrice: 192,
  OutboundLeg: {
    CarrierIds: [1324],
    DepartureDate: "2020-06-25T00:00:00",
    DestinationId: 40920,
    OriginId: 65698
  },
  QuoteDateTime: "2020-06-15T19:17:00",
  QuoteId: 10
}