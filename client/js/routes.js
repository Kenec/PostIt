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

export default (
  <Route path='/' component={App} >
      <IndexRoute component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='recoverpassword' component={ForgotPassword} />

      <Route path='/message' component={MessageBoard} />
      <Route path='/composeMessage' component={ComposeMessage} />
      <Route path='/sentMessage' component={SentMessage} />
      <Route path='/archiveMessage' component={ArchiveMessage} />
      <Route path='/detailMessage' component={DetailMessage} />
      <Route path='/createGroup' component={CreateGroup} />
      <Route path='/addUser' component={AddUser} />
      <Route path='/groupInfo' component={GroupInfo} />
  </Route>
)
