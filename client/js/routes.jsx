import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';
import CreateGroup from '../components/CreateGroup';
import Dashboard from '../components/Dashboard';
import Group from '../components/Group';
import MessageBoard from '../components/MessageBoard';
import ChangePassword from '../components/ChangePassword';
import requireAuth from '../utils/requireAuth';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Signin} />
    <Route path="signup" component={Signup} />
    <Route path="recoverpassword" component={ForgotPassword} />
    <Route path="/recoverpassword/:token" component={ChangePassword} />

    <Route path="/dashboard" component={requireAuth(Dashboard)} />
    <Route path="/group/:groupid" component={requireAuth(Group)} />
    <Route path="/createGroup" component={requireAuth(CreateGroup)} />
    <Route path="/group/:groupid/:messageid" component={requireAuth(MessageBoard)} />

  </Route>
);
