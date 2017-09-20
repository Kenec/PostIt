import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
// declare the redux devtool dependencies
/*eslint-disable*/
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const finalCreateStore = composeEnhancers(
  applyMiddleware(createLogger(), thunk)
)(createStore);


/**
 * configureStore - configure store for redux
 *
 * @param  {object} initialState = {} this returns an object
 * @return {method}                   returns the finalCreateStore method
 */
export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
// just before code Review
