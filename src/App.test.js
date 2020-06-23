import React from 'react';
import App from './App';
import { ProfilePage, Home } from 'Containers';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { createStore, applyMiddleware } from 'redux'; 
import { shallow, configure, mount } from "enzyme";
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const mocks = {
  user: {
    displayName: "Andrew",
    favourites: [{
      userRequest: {
        origin: "LOND",
        destination: "DUSS",
        outboundDate: "2020-06-23",
        inboundDate: "2020-06-25"
      },
      friendRequest: {
        origin: "BERL",
        destination: "DUSS",
        outboundDate: "2020-06-23",
        inboundDate: "2020-06-25"
      }
    }]
  },
  noDataUser: {
    displayName: "Andrew",
    favourites: []
  }
};

describe('App', () => {
  let store;

  beforeEach(() => {
    store = createStore(() => [], {}, applyMiddleware());
  })

  describe('App Matches Snapshot', () => {
    test('snapshot matches', () => {
      const renderer = new ShallowRenderer()
      const result = renderer.render(
        <Provider store={store}>
          <App />
        </Provider>
      )
      expect(result).toMatchSnapshot()
    });
  });

  describe('It renders without crashing', () => {
    test('renders without crashing', () => {
      shallow(<App />);
     });
  });

  test('/ path should render home container', () => {
    const wrapper = mount (
      <MemoryRouter initialEntries={[ '/' ]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  test('/profile should render profile container', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <Provider store={store}> 
          <Route path="/profile" render={() => <ProfilePage user={mocks.user} />} />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(ProfilePage).html());
  });
});
