import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { googleAnalytics } from "../middlewares/reactGAMiddlewares";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import { dehydrateImmutable, hydrateImmutable } from "immutable-stringify";
import { Map } from "immutable";

import callAPI from "../middlewares/callAPI";
import thunk from "redux-thunk";

export default function configureStore() {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__
    ? hydrateImmutable(window.__PRELOADED_STATE__).toObject()
    : {};

  let middleware = [thunk, callAPI, routerMiddleware(history)];
  if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger];
  } else if (navigator.userAgent !== "ReactSnap") {
    middleware = [...middleware, googleAnalytics];
  }
  const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(
    reducer(history),
    preloadedState,
    composedEnhancers
  );
  // Tell react-snap how to save Redux state
  window.snapSaveState = () => ({
    __PRELOADED_STATE__: dehydrateImmutable(Map(store.getState()))
  });

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;

  return store;
}
