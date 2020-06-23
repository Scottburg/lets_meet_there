import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from './Form.component';
import LocationSearch from '../LocationSearch/locationSearch';
import Button from '../Button/Button.component';
import { setupGoogleMock } from '../../Mocks/googleMapsApiMock';
import { render } from '@testing-library/react';

configure({adapter: new Adapter()});

beforeAll(() => {
  setupGoogleMock();
});

describe('Component: Form', () => {

  //TODO test the return data from submit

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

  const wrapper = shallow(<Form fields={formFields} showDateRange />);

  test('it should render correctly', () => {
    const formTree = renderer
      .create(<Form fields={formFields}/>)
      .toJSON();
    expect(formTree).toMatchSnapshot();
  });

  test('it should render the location search', () => {
    expect(wrapper.containsMatchingElement(<LocationSearch/>)).toEqual(true);
  });

  test('it should render the date range picker', () => {
    const mounted = mount(<Form fields={formFields} showDateRange />)
    expect(mounted.find('DateRangePicker').length).toEqual(1);
  });

  test('it should have a submit button', () => {
    expect(wrapper.containsMatchingElement(<Button>Submit</Button>)).toEqual(true);
  });

  test('it should fire on submit', () => {
    const mockFunction = jest.fn();
    const {getByText, getByTestId} = render (<Form fields={formFields}/>);

    const btn = getByText('Submit');
    const form = getByTestId('form');
    form.onsubmit = mockFunction;
    btn.click();
    expect(mockFunction).toHaveBeenCalled();
  })

});



