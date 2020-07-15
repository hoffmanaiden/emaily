import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import './style/index.css';

// Development only
// axios and window are needed to test api while
// using OAuth (to get those cookies! 🍪🤤)
import axios from 'axios';
window.axios = axios;

// root of Redux
const store = createStore(reducers, {}, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)