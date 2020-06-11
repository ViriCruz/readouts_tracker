import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/reset.css';
import './assets/styles/custom.css';
import rootReducer from './reducers/index';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';



const middlewares = [thunk];

const initialState = {
  pending: true,
  data: {},
  error: null,
};

const store = createStore(rootReducer, {
  user: initialState,
  categories: initialState,
  readings: initialState,
  measurements: initialState,
  totalTime: initialState,
  category: {},
}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
