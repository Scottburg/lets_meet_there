import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import allReducer from './Reducers'; // can use just the folder name if you're after the index.js file in it.
import { Provider } from 'react-redux'; // you need this to wrap the app us in redux and access the state.
//STORE -- globalised state

//Action - update matched

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // allows you to use the chrome devtools ext.
);

//reducer - transforms the state

// store.subscribe(() => console.log(store.getState()));

//dispatch - sends the data to update the store
// store.dispatch(isLoading());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
