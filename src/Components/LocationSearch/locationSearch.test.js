import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationSearch from './locationSearch';
import { setupGoogleMock } from '../../Mocks/googleMapsApiMock';

configure({adapter: new Adapter()});

beforeAll(() => {
  setupGoogleMock();
});

describe('Component: LocationSearch', () => {

  test.only('it should render correctly', () => {
    const locationSearchTree = renderer
    .create(<LocationSearch/>)
    .toJSON();
  expect(locationSearchTree).toMatchSnapshot();
  });

});