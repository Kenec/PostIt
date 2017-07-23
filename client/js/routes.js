import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';



export default (
  <Route path='/' component={App} >
      <IndexRoute component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='recoverpassword' component={ForgotPassword} />
  </Route>
)
