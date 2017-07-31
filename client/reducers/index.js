import { combineReducers } from 'redux';
import userLoginReducer from './users';
import flashMessages from './flashMessages';

const rootReducer = combineReducers({
  userLoginReducer,
  flashMessages
})

export default rootReducer;
