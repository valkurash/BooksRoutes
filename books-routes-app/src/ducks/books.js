import { appName, api } from "../config";
import { Record } from "immutable";
import {
  arrToMap,
  createRequestTypes,
  action,
  fetchEntity,
  fetchActionCreator,
  REQUEST,
  SUCCESS,
  FAILURE
} from "./utils";
import { createSelector } from "reselect";
import { all, take, fork } from "redux-saga/effects";
/**
 * Actions
 * */
export const moduleName = "books";

const prefix = `${appName}/${moduleName}`;

const BOOKS = createRequestTypes(`${prefix}/BOOKS`);
const SHOW_BOOKS = `${prefix}/SHOW_BOOKS`;
const FETCH_BOOKS = `${prefix}/FETCH_BOOKS`;

/**
 * Action Creators
 * */
const books = fetchActionCreator(BOOKS);

export function fetchBooks(fullQuery) {
  return action(FETCH_BOOKS, { payload: { fullQuery } });
}
export function showBooks(fullQuery) {
  return action(SHOW_BOOKS, { payload: { fullQuery } });
}

/**
 * Reducer
 * */
const bookForListWrapper = Record({
  entities: [],
  loading: false,
  loaded: false,
  error: false,
  paginationData: {
    page: null,
    pageSize: null,
    rowCount: null,
    pageCount: null
  }
});
const defaultBooksState = Record({
  entities: arrToMap([], bookForListWrapper),
  fullQuery: "?page=1&pageSize=18",
  defaultPageSize: 18
});

export default function reducer(state = new defaultBooksState(), action) {
  const { type, payload, response, error } = action;
  switch (type) {
    case SHOW_BOOKS:
      return state.set("fullQuery", payload.fullQuery);
    case BOOKS[SUCCESS]:
      return state
        .setIn(["entities", payload.fullQuery, "entities"], response.books)
        .setIn(
          ["entities", payload.fullQuery, "paginationData"],
          response.paginationData
        )
        .setIn(["entities", payload.fullQuery, "loading"], false)
        .setIn(["entities", payload.fullQuery, "loaded"], true)
        .setIn(["entities", payload.fullQuery, "error"], false);
    case BOOKS[REQUEST]:
      return state
        .set("fullQuery", payload.fullQuery)
        .setIn(["entities", payload.fullQuery, "loading"], true);
    case BOOKS[FAILURE]:
      return state
        .setIn(["entities", payload.fullQuery, "loading"], false)
        .setIn(["entities", payload.fullQuery, "loaded"], false)
        .setIn(["entities", payload.fullQuery, "error"], error);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];

export const fullQuerySelector = createSelector(
  stateSelector,
  state => state.fullQuery
);
export const booksDataSelector = createSelector(
  stateSelector,
  fullQuerySelector,
  (state, fullQuery) => state.entities.get(fullQuery)
);

export const defaultPageSizeSelector = createSelector(
  stateSelector,
  state => state.defaultPageSize
);
export const existedQueriesSelector = createSelector(stateSelector, state =>
  state.entities.keySeq().toArray()
);

/**
 * Sagas
 **/
const fetchBooksSaga = fetchEntity.bind(
  null,
  books,
  payload => `${api}/books/${payload.fullQuery}`
);

function* watchFetchBooksSaga() {
  while (true) {
    const { payload } = yield take(FETCH_BOOKS);
    yield fork(fetchBooksSaga, payload);
  }
}

export function* saga() {
  yield all([fork(watchFetchBooksSaga)]);
}
