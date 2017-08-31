import { combineReducers } from 'redux';
import userLoginReducer from './users';
import flashMessages from './flashMessages';
import group from './group';
import message from './message';

// combine all reducers
const rootReducer = combineReducers({
  userLoginReducer,
  flashMessages,
  group,
  message
});

export default rootReducer;
// just before code Review
