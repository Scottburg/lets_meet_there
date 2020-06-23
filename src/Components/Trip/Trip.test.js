import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import Trip from './Trip.component';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactReduxHooks from "../../Mocks/hooks";
import { configure } from 'enzyme';
import thunk from "redux-thunk";
import {placeMocks, quotes, carriers, flightOne, flightTwo, favLocation, userCity, friendCity, searchDetailsForRemoveHandler} from '../../Mocks/data.mock';
configure({adapter: new Adapter()});

describe('Trip', () => {
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
        <Trip 
          yourFlight={flightOne} 
          friendsFlight={flightTwo}
          location={65698}
        />
      </Provider>
    )
  });
  
  test('Should render inner DOM components', () => {
    // wrapper.findAllByText('Book').then(data => data);
    
  });

  test('snapshot matches', () => {
    const result = render(
      <Provider store={store}>
        <Trip 
          yourFlight={flightOne} 
          friendsFlight={flightTwo}
          location={65698}
        />
      </Provider>
    )
    expect(result).toMatchSnapshot()
  });

  test('snapshot matches', () => {
    const result = render(
      <Provider store={store}>
        <Trip 
          yourFlight={flightOne} 
          friendsFlight={flightTwo}
          location={65698}
          favourites={true}
          userCity={userCity}
          friendCity={friendCity}
          favLocation={favLocation}
          searchDetailsForRemoveHandler={searchDetailsForRemoveHandler}
        />
      </Provider>
    )
    expect(result).toMatchSnapshot()
  });

  test('should render and click', () => {
    const mockFunction = jest.fn();
    const {getByText} = render(  
      <Provider store={store}>
        <Trip 
          yourFlight={flightOne} 
          friendsFlight={flightTwo}
          location={65698}
          user={{
            favourites: []
          }}
          
        />
      </Provider>)

    const btn = getByText('Add To Favourites');
    btn.onclick = mockFunction;
    btn.click()
    expect(mockFunction).toHaveBeenCalled();
    expect(btn).toBeInTheDocument();
  })

  test('should render and click', () => {
    const mockFunction = jest.fn();
    const {getByText} = render(  
      <Provider store={store}>
        <Trip 
          yourFlight={flightOne} 
          friendsFlight={flightTwo}
          location={65698}
          favourites={true}
          userCity={userCity}
          friendCity={friendCity}
          favLocation={favLocation}
          user={{
            favourites: []
          }}
          removeFromFavouritesHandler={mockFunction}
          searchDetailsForRemoveHandler={searchDetailsForRemoveHandler}
        />
      </Provider>)

    const btn = getByText('Remove From Favourites');
    btn.onclick = mockFunction;
    btn.click()
    expect(mockFunction).toHaveBeenCalled();
    expect(btn).toBeInTheDocument();
  })
});