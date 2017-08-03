import { combineReducers } from 'redux';
import userLoginReducer from './users';
import flashMessages from './flashMessages';
import group from './group';

const rootReducer = combineReducers({
  userLoginReducer,
  flashMessages,
  group
})

export default rootReducer;
