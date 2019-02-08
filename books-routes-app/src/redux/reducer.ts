import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as formReducer } from 'redux-form/immutable';
import booksReducer, { moduleName as booksModule } from '../ducks/books';
import bookReducer, { moduleName as bookModule } from '../ducks/book';
import filtersReducer, { moduleName as filtersModule } from '../ducks/filters';
import newBookReducer, { moduleName as newBookModule } from '../ducks/newBook';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    [booksModule]: booksReducer,
    [bookModule]: bookReducer,
    [filtersModule]: filtersReducer,
    [newBookModule]: newBookReducer,
  });
