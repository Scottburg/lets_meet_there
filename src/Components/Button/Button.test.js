import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button.component';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Booking Link', () => {

  test('snapshot renders', () => {
    const component = renderer.create(
    <Button 
      type='submit'
      children='Submit'
    />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it calls func on button click', () => {
    const mockFunction = jest.fn();
  
    const component = shallow (
      <Button 
        type='submit'
        onClick={mockFunction}
        children='Submit'
      />
    );
    
    component.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});