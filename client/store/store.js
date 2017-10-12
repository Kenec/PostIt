import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
// declare the redux devtool dependencies
/*eslint-disable*/
const composeEnhancers = compose;

const finalCreateStore = composeEnhancers(
  applyMiddleware(thunk)
)(createStore);


/**
 * configureStore - configure store for redux
 * @param  {object} initialState = {} this returns an object
 * @return {method} returns the finalCreateStore method
 */
export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
