import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers/root-reducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk]; //thunk is a middleware

const composeEnhancers =  typeof window === 'object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const composingMiddlewareAndDevTools = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(rootReducer,
                          initialState,
						  composingMiddlewareAndDevTools);

console.log(store.getState());

export default store;
