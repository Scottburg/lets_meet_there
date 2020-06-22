import React from 'react';
import { Home } from 'Containers';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { createStore, applyMiddleware } from 'redux'; 

describe('Home Container', () => {
  let store;

  beforeEach(() => {
    store = createStore(() => [], {}, applyMiddleware());
  })

  test('snapshot matches (user: false)', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <Provider store={store}>
        <Home currentUser={null} />
      </Provider>
    )
    expect(result).toMatchSnapshot()
  });

  test('snapshot matches (user: true)', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <Provider store={store}>
        <Home user={true} />
      </Provider>
    )
    expect(result).toMatchSnapshot()
  });

});

