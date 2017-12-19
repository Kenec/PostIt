import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = compose;

const finalCreateStore = composeEnhancers(
  applyMiddleware(thunk)
)(createStore);

/**
 * configureStore - configure store for redux
 * @param  {object} initialState defines the initial state of the store
 * @return {method} returns the finalCreateStore method
 */
export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
