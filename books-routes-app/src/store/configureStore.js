import {createStore, compose, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers';
// import randomId from '../middlewares/randomId'
import callAPI from '../middlewares/callAPI'
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';
const {Map} = require('immutable')

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators,
    // serialize...
  })
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
/* randomId,*/
callAPI, routerMiddleware(history), logger));

const store = createStore(reducer, Map(), enhancer);
window.store = store;

export default store;
