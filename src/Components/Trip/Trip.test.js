import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import FlightTile from './flightTile';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactReduxHooks from "../../Mocks/hooks";
import { configure } from 'enzyme';
import thunk from "redux-thunk";
import {placeMocks, quotes, carriers, flightOne, flightTwo} from '../../Mocks/data.mock';
configure({adapter: new Adapter()});

describe('Flight Tile', () => {
  let store;
  let wrapper;
  
  beforeEach(() => {
    store = configureStore([thunk])({
      places: placeMocks,
      quotes: quotes,
      carriers: carriers
    });

    jest.mock('react-redux', () => ({
      useSelector: jest.fn()
    }));

    jest
    .spyOn(ReactReduxHooks, 'useSelector')
    .mockImplementation(state => store.getState());

    wrapper = render (
      <Provider store={store}>
        <FlightTile 
          flight1={flightOne} 
          flight2={flightTwo}
          location={65698}
        />
      </Provider>
    )
  });
  
  test('Should render inner DOM components', () => {
    wrapper.findAllByText('Book').then(data => data);
  });
});