import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import SearchForm from './searchForm';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

it('render correctly text component', () => {  
  const searchForm = renderer.create(<SearchForm />).toJSON();
  expect(searchForm).toMatchSnapshot();
});

it('display correct text', () => {  
  const searchForm = render(<SearchForm />);
  searchForm.findAllByText('Lets Meet There').then(data => data);
});

it('should have an two text fields', () => {
  const searchForm = shallow(<SearchForm />);
  expect(searchForm.find('input[type="text"]').length).toEqual(2);
});

it('input fields should have correct props', () => {
  const searchForm = shallow(<SearchForm />);
  expect(searchForm.find('input[name="from1"]').props()).toEqual({
    onChange: expect.any(Function),
    type: 'text',
    className: 'inputboxes',
    name: 'from1',
    placeholder: 'E.g. London',
    value: '',
  });

  expect(searchForm.find('input[name="from2"]').props()).toEqual({
    onChange: expect.any(Function),
    type: 'text',
    className: 'inputboxes',
    name: 'from2',
    placeholder: 'E.g. Barcelona',
    value: '',
  });
});

it('form should have submit function', () => {
  const searchForm = shallow(<SearchForm />);
  expect(searchForm.find('#formWrapper').props()).toEqual({
    onSubmit: expect.any(Function),
    children: expect.any(Array),
    className: "form",
    id: "formWrapper",
  });
});

it('should have a submit button', () => {
  const searchForm = shallow(<SearchForm />);
  expect(searchForm.find('button').props()).toEqual({
    children: 'Lets Meet There!',
    type: "submit"
  });
});