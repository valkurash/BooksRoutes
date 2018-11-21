import { appName, api } from "../config";
import { Record } from "immutable";
import { arrToMap, fetchAPI } from "./utils";
import { createSelector } from "reselect";
import { put, call, all, takeEvery } from "redux-saga/effects";
/**
 * Actions
 * */
export const moduleName = "book";

const prefix = `${appName}/${moduleName}`;

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const FETCH_BOOK = `${prefix}/FETCH_BOOK`;

/**
 * Reducer
 * */
const formatPath = pathArr =>
  pathArr.map(p => {
    return {
      lat: p[0],
      lng: p[1]
    };
  });

export const singleBookRecord = Record({
  id: null,
  title: null,
  cover: null,
  description: null,
  authors: null,
  routes: null,
  ozon: null,
  litres: null
});
export const singleBookWrapper = Record({
  entities: singleBookRecord,
  loading: false,
  loaded: false,
  error: false
});
export const defaultSingleBooksState = Record({
  entities: arrToMap([], singleBookWrapper)
});

export default function reducer(state = new defaultSingleBooksState(), action) {
  const { type, payload, response, error } = action;
  switch (type) {
    case FETCH_BOOK + SUCCESS:
      //TODO: optimize
      response.routes.forEach(r => {
        r.points.forEach(p => {
          if (p.point) {
            p.point = {
              lat: p.point.x,
              lng: p.point.y
            };
          }
          if (p.polyline) {
            p.polyline = formatPath(JSON.parse(p.polyline));
            p.strokeColor = `hsl(${Math.floor(
              Math.random() * 360
            )}, 100%, 50%)`;
          }
          if (p.polygon) {
            p.polygon = JSON.parse(p.polygon);
            p.strokeColor = `hsl(${Math.floor(
              Math.random() * 360
            )}, 100%, 50%)`;
          }
        });
      });
      return state
        .setIn(
          ["entities", payload.id, "entities"],
          new singleBookRecord(response)
        )
        .setIn(["entities", payload.id, "loading"], false)
        .setIn(["entities", payload.id, "loaded"], true)
        .setIn(["entities", payload.id, "error"], false);
    case FETCH_BOOK + START:
      return state.setIn(["entities", payload.id, "loading"], true);
    case FETCH_BOOK + FAIL:
      return state
        .setIn(["entities", payload.id, "loading"], false)
        .setIn(["entities", payload.id, "loaded"], false)
        .setIn(["entities", payload.id, "error"], error);
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];

export const bookIdSelector = (state, props) => props.match.params.bookId;
export const routeIdSelector = (state, props) => props.match.params.routeId;

export const bookSelector = createSelector(
  stateSelector,
  bookIdSelector,
  (state, bookId) => state.entities.get(bookId)
);

export const routeSelector = createSelector(
  stateSelector,
  bookIdSelector,
  routeIdSelector,
  (state, bookId, routeId) =>
    state
      .get("entities")
      .get(bookId)
      .get("entities")
      .get("routes")
      .find(route => route.id.toString() === routeId)
);

/**
 * Action Creators
 * */

export function fetchBook(id) {
  return {
    type: FETCH_BOOK + START,
    payload: { id }
  };
}

/**
 * Sagas
 **/
export function* fetchBookSaga({ payload }) {
  try {
    const result = yield call(
      fetchAPI,
      `${api}/books/book/${payload.id}`,
      payload
    );
    yield put({
      type: FETCH_BOOK + SUCCESS,
      ...result
    });
  } catch (error) {
    yield put({
      type: FETCH_BOOK + FAIL,
      ...error
    });
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_BOOK + START, fetchBookSaga)]);
}
