import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchForm from './SearchForm.component';
import { setupGoogleMock } from '../../Mocks/googleMapsApiMock';

configure({adapter: new Adapter()});

beforeAll(() => {
  setupGoogleMock();
});

describe('Component: SearchForm', () => {

  //TODO: add expected return data from the onSubmit event

  const formFields = [
    {
      key: 'location',
      title: 'Location',
      name: 'location',
      type: 'text',
      placeholder: 'London...'
    },
    {
      key: 'destination',
      title: 'Destination',
      name: 'destination',
      type: 'text',
      placeholder: 'Barcelona...'
    }
  ];

  const testValues = {
    key: "searchflights",
    title: "Search for Flights", 
    fields: formFields,
    hasError: false,
    showDateRange: true,
    onSubmit: jest.fn()
  };

  const wrapper = shallow(<SearchForm {...testValues} />);

  test.only('it should render correctly', () => {
    const searchFormTree = renderer
      .create(<SearchForm />)
      .toJSON();
    expect(searchFormTree).toMatchSnapshot();
  });

  test('it should submit the form', () => {
    expect(wrapper.handleSubmit).toHaveBeenCalledTimes(1);
  });

});
