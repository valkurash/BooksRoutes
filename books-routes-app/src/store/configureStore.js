import { createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "../reducers";
import { googleAnalytics } from "../middlewares/reactGAMiddlewares";
import callAPI from "../middlewares/callAPI";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../history";
const { Map } = require("immutable");

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

const store = createStore(reducer, Map(), enhancer);
window.store = store;

export default store;
