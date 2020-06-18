import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import SearchList from './searchForm';

it('render correctly text component', () => {  
  const SearchListComponent = renderer.create(<SearchList />).toJSON();
  expect(SearchListComponent).toMatchSnapshot();
});