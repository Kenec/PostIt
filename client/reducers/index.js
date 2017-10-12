import { combineReducers } from 'redux';
import userLogin from './users';
import flashMessages from './flashMessages';
import group from './group';
import message from './message';

// combine all reducers
const rootReducer = combineReducers({
  userLogin,
  flashMessages,
  group,
  message
});

export default rootReducer;
