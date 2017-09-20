import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../components/App';
import SigninPage from '../components/Signin';
import SignupPage from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';
import CreateGroup from '../components/CreateGroup';
import DashboardPage from '../components/Dashboard';
import Group from '../components/Group';
import MessageBoard from '../components/MessageBoard';
import ChangePassword from '../components/ChangePassword';
import NotFoundPage from '../components/NotFound';
import requireAuth from '../utils/requireAuth';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={SigninPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="recoverpassword" component={ForgotPassword} />
      <Route path="/recoverpassword/:token" component={ChangePassword} />

      <Route path="/dashboard" component={requireAuth(DashboardPage)} />
      <Route path="/group/:groupid" component={requireAuth(Group)} />
      <Route path="/createGroup" component={requireAuth(CreateGroup)} />
      <Route path="/group/:groupid/:messageid" component={requireAuth(MessageBoard)} />
      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);
