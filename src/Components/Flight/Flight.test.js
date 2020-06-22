import React from 'react';
import renderer from 'react-test-renderer';
import { Flight } from 'Components';
import { shallow, render, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Flight', () => {
  let flight, places, flightInDirect;

  beforeEach(() => {
    flight = {
      QuoteId: 14,
      MinPrice: 278,
      Direct: true,
      OutboundLeg: {
        CarrierIds: [
          858
        ],
        OriginId: 42414,
        DestinationId: 51631,
        DepartureDate: '2020-06-24T00:00:00'
      },
      InboundLeg: {
        CarrierIds: [
          1090
        ],
        OriginId: 51631,
        DestinationId: 42414,
        DepartureDate: '2020-06-27T00:00:00'
      },
      QuoteDateTime: '2020-06-22T09:18:00'
    }
    flightInDirect = {
      QuoteId: 14,
      MinPrice: 278,
      Direct: false,
      OutboundLeg: {
        CarrierIds: [
          858
        ],
        OriginId: 42414,
        DestinationId: 51631,
        DepartureDate: '2020-06-24T00:00:00'
      },
      InboundLeg: {
        CarrierIds: [
          1090
        ],
        OriginId: 51631,
        DestinationId: 42414,
        DepartureDate: '2020-06-27T00:00:00'
      },
      QuoteDateTime: '2020-06-22T09:18:00'
    }
    places = {
      inbound: {
        origin: {
          PlaceId: 65441,
          IataCode: 'LCA',
          Name: 'Larnaca',
          Type: 'Station',
          SkyscannerCode: 'LCA',
          CityName: 'Larnaca',
          CityId: 'LARN',
          CountryName: 'Cyprus'
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
      },
      outbound: {
        origin: {
          PlaceId: 42414,
          IataCode: 'BCN',
          Name: 'Barcelona',
          Type: 'Station',
          SkyscannerCode: 'BCN',
          CityName: 'Barcelona',
          CityId: 'BARC',
          CountryName: 'Spain'
        },
        destination: {
          PlaceId: 65441,
          IataCode: 'LCA',
          Name: 'Larnaca',
          Type: 'Station',
          SkyscannerCode: 'LCA',
          CityName: 'Larnaca',
          CityId: 'LARN',
          CountryName: 'Cyprus'
        }
      }
    }
  });

  test('snapshot renders', () => {
    const component = renderer.create(
    <Flight 
      flight={flight}
      places={places}
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot renders (favourite)', () => {
    const component = renderer.create(
    <Flight 
      flight={flight}
      places={places}
      city='Barcelona'
      favCity='Barcelona'
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Flight Direct', () => {
    const component = render (
      <Flight 
        flight={flight}
        places={places}
        city='Barcelona'
        favCity='Barcelona'
      />
    )
    expect(component.text()).toMatch('Direct');
  });

  test('Flight InDirect', () => {
    const component = render (
      <Flight 
        flight={flightInDirect}
        places={places}
        city='Barcelona'
        favCity='Barcelona'
      />
    )
    expect(component.text()).toMatch('InDirect');
  });

});