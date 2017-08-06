import { combineReducers } from 'redux';
import userLoginReducer from './users';
import flashMessages from './flashMessages';
import group from './group';
import message from './message';

const rootReducer = combineReducers({
  userLoginReducer,
  flashMessages,
  group,
  message
})

export default rootReducer;
