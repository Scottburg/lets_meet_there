import React from 'react';
import renderer from 'react-test-renderer';
import BookingLink from './BookingLink.component';
 
describe('Booking Link', () => {
  let inbound, outbound, flight;

  beforeEach(() => {
    inbound = {
      origin: {
        PlaceId: 51631,
        IataCode: 'FCO',
        Name: 'Rome Fiumicino',
        Type: 'Station',
        SkyscannerCode: 'FCO',
        CityName: 'Rome',
        CityId: 'ROME',
        CountryName: 'Italy'
      },
      destination: {
        PlaceId: 42414,
        IataCode: 'BCN',
        Name: 'Barcelona',
        Type: 'Station',
        SkyscannerCode: 'BCN',
        CityName: 'Barcelona',
        CityId: 'BARC',
        CountryName: 'Spain'
      }
    }

    outbound = {
      origin: {
        PlaceId: 65698,
        IataCode: 'LHR',
        Name: 'London Heathrow',
        Type: 'Station',
        SkyscannerCode: 'LHR',
        CityName: 'London',
        CityId: 'LOND',
        CountryName: 'United Kingdom'
      },
      destination: {
        PlaceId: 63238,
        IataCode: 'KEF',
        Name: 'Reykjavik Keflavik',
        Type: 'Station',
        SkyscannerCode: 'KEF',
        CityName: 'Reykjavik',
        CityId: 'REYK',
        CountryName: 'Iceland'
      }
    }

    flight = {
      QuoteId: 3,
      MinPrice: 1109,
      Direct: false,
      OutboundLeg: {
        CarrierIds: [
          1878
        ],
        OriginId: 42414,
        DestinationId: 48018,
        DepartureDate: '2020-06-24T00:00:00'
      },
      InboundLeg: {
        CarrierIds: [
          1324
        ],
        OriginId: 48018,
        DestinationId: 42414,
        DepartureDate: '2020-06-27T00:00:00'
      },
      QuoteDateTime: '2020-06-21T20:05:00'
    }
  });

  test('snapshot renders', () => {
    const component = renderer.create(
    <BookingLink 
      inbound={inbound}
      outbound={outbound}
      flight={flight}
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot renders', () => {
    const component = renderer.create(
    <BookingLink 
      inbound={inbound}
      outbound={outbound}
      flight={flight}
      city='Barcelona'
      favCity='Barcelona'
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});