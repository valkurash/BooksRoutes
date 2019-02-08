import { all } from 'redux-saga/effects';
import { saga as booksSaga } from '../ducks/books';
import { saga as bookSaga } from '../ducks/book';
import { saga as filtersSaga } from '../ducks/filters';
import { saga as newBookSaga } from '../ducks/newBook';

export default function*() {
  yield all([booksSaga(), bookSaga(), filtersSaga(), newBookSaga()]);
}
