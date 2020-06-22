import React from 'react';
import renderer from 'react-test-renderer';
import FlightSummary from './FlightSummary.component';
 
describe('Flight Summary', () => {
  let location;

  beforeEach(() => {
    location = {
      city: 'Barcelona',
      Country: 'Spain'
    }
  });

  test('snapshot renders', () => {
    const component = renderer.create(
    <FlightSummary
      location={location}
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});