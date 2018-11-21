import { appName, api } from "../config";
import { Record } from "immutable";
import { fetchAPI } from "./utils";
import { put, call, all, takeEvery } from "redux-saga/effects";

/**
 * Actions
 * */
export const moduleName = "newBook";

const prefix = `${appName}/${moduleName}`;

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const CHANGE_NEW_BOOK_POINTS = `${prefix}/CHANGE_NEW_BOOK_POINTS`;
export const REMOVE_NEW_BOOK_POINTS = `${prefix}/REMOVE_NEW_BOOK_POINTS`;
export const ADD_DESCRIPTION_NEW_BOOK_POINTS = `${prefix}/ADD_DESCRIPTION_NEW_BOOK_POINTS`;
export const CHANGE_NEW_BOOK_DATA = `${prefix}/CHANGE_NEW_BOOK_DATA`;
export const SEND_NEW_BOOK = `${prefix}/SEND_NEW_BOOK`;

/**
 * Reducer
 * */
export const newBookDataRecord = Record({
  title: "",
  authors: "",
  route: "",
  googleMyMaps: "",
  points: [],
  loading: false,
  loaded: false,
  error: false
});

export default function reducer(state = new newBookDataRecord(), action) {
  const { type, payload, error } = action;
  switch (type) {
    case CHANGE_NEW_BOOK_POINTS:
      return state.set("points", payload.points);
    case REMOVE_NEW_BOOK_POINTS:
      return state.set("points", [
        ...state.get("points").slice(0, payload.index),
        ...state.get("points").slice(payload.index + 1)
      ]);
    case ADD_DESCRIPTION_NEW_BOOK_POINTS:
      return state.set("points", [
        ...state.get("points").slice(0, payload.index),
        Object.assign({}, state.get("points")[payload.index], {
          description: payload.value
        }),
        ...state.get("points").slice(payload.index + 1)
      ]);
    case CHANGE_NEW_BOOK_DATA:
      return state.set(payload.name, payload.value);
    case SEND_NEW_BOOK + SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", false)
        .set("title", "")
        .set("googleMyMaps", "")
        .set("authors", "")
        .set("route", "")
        .set("points", []);

    case SEND_NEW_BOOK + START:
      return state.set("loading", true).set("loaded", false);
    case SEND_NEW_BOOK + FAIL:
      return state
        .set("loading", false)
        .set("loaded", false)
        .set("error", error);
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];

/**
 * Action Creators
 * */
export function changeNewBooksPoint(points) {
  return {
    type: CHANGE_NEW_BOOK_POINTS,
    payload: { points }
  };
}
export function removeNewBooksPoint(index) {
  return {
    type: REMOVE_NEW_BOOK_POINTS,
    payload: { index }
  };
}
export function newBookPointDescrChanged(value, index) {
  return {
    type: ADD_DESCRIPTION_NEW_BOOK_POINTS,
    payload: { value, index }
  };
}
export function changeNewBooksData(name, value) {
  return {
    type: CHANGE_NEW_BOOK_DATA,
    payload: { name, value }
  };
}
export function sendNewBook(bookData) {
  return {
    type: SEND_NEW_BOOK + START,
    payload: { ...bookData }
  };
}
/**
 * Sagas
 **/
export function* sendNewBookSaga({ payload }) {
  try {
    const result = yield call(fetchAPI, `${api}/books`, payload, "POST");
    yield put({
      type: SEND_NEW_BOOK + SUCCESS,
      ...result
    });
  } catch (error) {
    yield put({
      type: SEND_NEW_BOOK + FAIL,
      ...error
    });
  }
}

export function* saga() {
  yield all([takeEvery(SEND_NEW_BOOK + START, sendNewBookSaga)]);
}
