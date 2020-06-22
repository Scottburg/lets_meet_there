import React from 'react';
import App from './App';
import { ProfilePage } from 'Containers';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { createStore, applyMiddleware } from 'redux'; 
import { shallow, configure } from "enzyme";
import { render } from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

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

  describe('App - on start', () => {
    test("React test", () => {
      let a = false;
      function Test() {
        React.useEffect(() => {
          a = true;
        });
        return <div>Hello World</div>;
      }
      const { rerender } = render(<Test />);
      rerender(<Test />);
      expect(a).toBe(true);
    });
  });

  describe('First React component test with Enzyme', () => {
    test('renders without crashing', () => {
      shallow(<App />);
     });
  });

});
