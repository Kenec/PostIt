import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';
import MessageBoard from '../components/MessageBoard';
import ComposeMessage from '../components/ComposeMessage';
import SentMessage from '../components/SentMessage';
import ArchiveMessage from '../components/ArchiveMessage';
import DetailMessage from '../components/DetailMessage';
import CreateGroup from '../components/CreateGroup';
import AddUser from '../components/AddUser';
import GroupInfo from '../components/GroupInfo';
import Dashboard from '../components/Dashboard';
import Group from '../components/Group';

import requireAuth from '../utils/requireAuth';

export default (
  <Route path='/' component={App} >
      <IndexRoute component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='recoverpassword' component={ForgotPassword} />

      <Route path='/dashboard' component={requireAuth(Dashboard)} />
      <Route path='/group/:groupid' component={requireAuth(Group)} />
      <Route path='/message' component={requireAuth(MessageBoard)} />
      <Route path='/composeMessage' component={requireAuth(ComposeMessage)} />
      <Route path='/sentMessage' component={requireAuth(SentMessage)} />
      <Route path='/archiveMessage' component={requireAuth(ArchiveMessage)} />
      <Route path='/detailMessage' component={requireAuth(DetailMessage)} />
      <Route path='/createGroup' component={requireAuth(CreateGroup)} />
      <Route path='/addUser' component={requireAuth(AddUser)} />
      <Route path='/groupInfo' component={requireAuth(GroupInfo)} />
  </Route>
)
