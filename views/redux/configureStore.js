"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// ​
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
// import rootReducer from './reducers'
// ​
// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)
// ​
//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = compose(...enhancers)
// ​
//   const store = createStore(rootReducer, preloadedState, composedEnhancers)
// ​
//   return store
// }
function configureStore(preloadedState) {
  //   const middlewares = [loggerMiddleware, thunkMiddleware]
  //   const middlewareEnhancer = applyMiddleware(...middlewares)
  // ​
  //   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  //   const composedEnhancers = compose(...enhancers)
  var store = (0, _redux.createStore)(_reducers.default);
  return store;
}