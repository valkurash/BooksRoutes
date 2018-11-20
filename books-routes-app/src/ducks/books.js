import { appName, api } from "../config";
import { Record } from "immutable";
import { arrToMap } from "./utils";
import { createSelector } from "reselect";

/**
 * Actions
 * */
export const moduleName = "books";

const prefix = `${appName}/${moduleName}`;

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const FETCH_BOOKS = `${prefix}/FETCH_BOOKS`;
export const SHOW_BOOKS = `${prefix}/SHOW_BOOKS`;

/**
 * Reducer
 * */
export const bookForListWrapper = Record({
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
export const defaultBooksState = Record({
  entities: arrToMap([], bookForListWrapper),
  fullQuery: "?page=1&pageSize=18",
  defaultPageSize: 18
});

export default function reducer(state = new defaultBooksState(), action) {
  const { type, payload, response, error } = action;
  switch (type) {
    case SHOW_BOOKS:
      return state.set("fullQuery", payload.fullQuery);
    case FETCH_BOOKS + SUCCESS:
      return state
        .setIn(["entities", payload.fullQuery, "entities"], response.books)
        .setIn(
          ["entities", payload.fullQuery, "paginationData"],
          response.paginationData
        )
        .setIn(["entities", payload.fullQuery, "loading"], false)
        .setIn(["entities", payload.fullQuery, "loaded"], true)
        .setIn(["entities", payload.fullQuery, "error"], false);
    case FETCH_BOOKS + START:
      return state
        .set("fullQuery", payload.fullQuery)
        .setIn(["entities", payload.fullQuery, "loading"], true);
    case FETCH_BOOKS + FAIL:
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
 * Action Creators
 * */

export function fetchBooks(fullQuery) {
  return {
    type: FETCH_BOOKS,
    payload: { fullQuery },
    callAPI: `${api}/books/${fullQuery}`
  };
}
export function showBooks(fullQuery) {
  return {
    type: SHOW_BOOKS,
    payload: { fullQuery }
  };
}

/**
 * Sagas
 **/
