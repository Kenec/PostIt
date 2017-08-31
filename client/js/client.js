import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import routes from './routes';
import configureStore from '../store/store'
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {setCurrentUser} from '../actions/signinActions'

let initialState = {};

let store = configureStore(initialState)

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


render(
  <Provider store={store}>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('app')
)
// just before code Review
