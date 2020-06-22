import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom'
import configureStore from 'redux-mock-store'
import App from './App';

const mockStore = configureStore([]);

test('renders learn react link', () => {
  let store = mockStore();

  const { getByText } = render(<Router><Provider store={store}><App /></Provider></Router>);
  const linkElement = getByText('Search for a place to meet');
  expect(linkElement).toBeInTheDocument(true);
});