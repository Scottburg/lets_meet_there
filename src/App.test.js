import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);
const store = mockStore();

describe('test the Spinner', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(asFragment(<App />)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const title = getByText('Search for a place to meet');
    expect(title).toBeInTheDocument();
  });
});
