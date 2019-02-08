import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';
import monitorReducersEnhancer from '../enhancers/monitorReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { googleAnalytics } from '../middlewares/reactGAMiddlewares';
import { yaMetrika } from '../middlewares/yaMetrikaMiddlewares';
import { routerMiddleware } from 'connected-react-router';
import history from '../history';
import { dehydrateImmutable, hydrateImmutable } from 'immutable-stringify';
import { Map } from 'immutable';
import rootSaga from './saga';
import createSagaMiddleware from 'redux-saga';

// The top-level state object
export interface ApplicationState {
  layout: string;
  heroes: string;
  teams: string;
}

export default function configureStore() {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = (window as any).__PRELOADED_STATE__
    ? hydrateImmutable((window as any).__PRELOADED_STATE__).toObject()
    : {};

  const sagaMiddleware = createSagaMiddleware();

  let middleware = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
  } else if (navigator.userAgent !== 'ReactSnap') {
    middleware = [...middleware, googleAnalytics, yaMetrika];
  }

  let enhancers = [applyMiddleware(...middleware)];
  if (
    process.env.NODE_ENV !== 'production' &&
    navigator.userAgent !== 'ReactSnap'
  ) {
    enhancers = [...enhancers, monitorReducersEnhancer];
  }

  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(
    reducer(history),
    preloadedState,
    composedEnhancers
  );

  sagaMiddleware.run(rootSaga);

  // Tell react-snap how to save Redux state
  (window as any).snapSaveState = () => ({
    __PRELOADED_STATE__: dehydrateImmutable(Map(store.getState())),
  });

  // Allow the passed state to be garbage-collected
  delete (window as any).__PRELOADED_STATE__;

  return store;
}
