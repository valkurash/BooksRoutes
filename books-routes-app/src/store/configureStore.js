import { createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "../reducers";
import { googleAnalytics } from "../middlewares/reactGAMiddlewares";
import callAPI from "../middlewares/callAPI";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../history";
import { dehydrateImmutable, hydrateImmutable } from "immutable-stringify";
import { Map } from "immutable";

// Grab the state from a global variable injected into the server-generated HTML
export const initialStoreState = window.__PRELOADED_STATE__
  ? hydrateImmutable(window.__PRELOADED_STATE__)
  : Map();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators,
      // serialize...
    })
  : compose;

let middleware = [thunk, callAPI, routerMiddleware(history)];
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
} else if (navigator.userAgent !== "ReactSnap") {
  middleware = [...middleware, googleAnalytics];
}
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducer, initialStoreState, enhancer);
window.store = store;

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: dehydrateImmutable(store.getState())
});

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

export default store;
