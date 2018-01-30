import {createStore, compose, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import reducer from './reducers';
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from './history'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger))

const store = createStore(reducer, enhancer)
window.store = store

export default store