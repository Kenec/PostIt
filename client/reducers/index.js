import { combineReducers } from 'redux';
import userLoginReducer from './users';

const rootReducer = combineReducers({
  userLoginReducer,
})

export default rootReducer;
