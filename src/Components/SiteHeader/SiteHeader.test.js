import React from 'react';
import SiteHeader from '../../Components/SiteHeader';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount, configure } from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Site Header', () => {

  test('snapshot matches', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <SiteHeader 
        user={null} 
      />
    )
    expect(result).toMatchSnapshot()
  });

  test('renders home link', () => {
    const { getByText } = render(
      <Router>
        <SiteHeader />
      </Router>
    );
    const link = getByText('Home');
    expect(link).toBeInTheDocument();
  });

  test('renders profile and signout when logged in', () => {
    const { getByText } = render(
      <Router>
        <SiteHeader user={true} />
      </Router>
    );
    const link = getByText('Profile');
    expect(link).toBeInTheDocument();
    const signout = getByText('Sign Out');
    expect(signout).toBeInTheDocument();
  });

});

