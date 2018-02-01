import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { booksReducer } from './booksReducers';

export default combineReducers({
  router,
  books: booksReducer,
});
