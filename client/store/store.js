import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';

let finalCreateStore = compose(
    applyMiddleware(createLogger(),thunk)
  )(createStore)

export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
