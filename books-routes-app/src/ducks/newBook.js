import { appName, api } from "../config";
import { Record } from "immutable";
import {
  createRequestTypes,
  action,
  fetchEntity,
  fetchActionCreator,
  REQUEST,
  SUCCESS,
  FAILURE
} from "./utils";
import { all, take, fork } from "redux-saga/effects";

/**
 * Actions
 * */
export const moduleName = "newBook";

const prefix = `${appName}/${moduleName}`;

const NEW_BOOK = createRequestTypes(`${prefix}/NEW_BOOK`);
const SEND_NEW_BOOK = `${prefix}/SEND_NEW_BOOK`;

const CHANGE_NEW_BOOK_POINTS = `${prefix}/CHANGE_NEW_BOOK_POINTS`;
const REMOVE_NEW_BOOK_POINTS = `${prefix}/REMOVE_NEW_BOOK_POINTS`;
const ADD_DESCRIPTION_NEW_BOOK_POINTS = `${prefix}/ADD_DESCRIPTION_NEW_BOOK_POINTS`;
const CHANGE_NEW_BOOK_DATA = `${prefix}/CHANGE_NEW_BOOK_DATA`;

/**
 * Action Creators
 * */
const newBook = fetchActionCreator(NEW_BOOK);

export function sendNewBook(bookData) {
  return action(SEND_NEW_BOOK, { payload: bookData });
}
export function changeNewBooksPoint(points) {
  return action(CHANGE_NEW_BOOK_POINTS, { payload: { points } });
}
export function removeNewBooksPoint(index) {
  return action(REMOVE_NEW_BOOK_POINTS, { payload: { index } });
}
export function newBookPointDescrChanged(value, index) {
  return action(ADD_DESCRIPTION_NEW_BOOK_POINTS, { payload: { value, index } });
}

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
    case NEW_BOOK[SUCCESS]:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", false)
        .set("title", "")
        .set("googleMyMaps", "")
        .set("authors", "")
        .set("route", "")
        .set("points", []);
    case NEW_BOOK[REQUEST]:
      return state.set("loading", true).set("loaded", false);
    case NEW_BOOK[FAILURE]:
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
 * Sagas
 **/
const sendNewBookSaga = fetchEntity.bind(null, newBook, () => `${api}/books`);

function* watchSendNewBookSaga() {
  while (true) {
    const { payload } = yield take(SEND_NEW_BOOK);
    yield fork(sendNewBookSaga, payload, "POST");
  }
}

export function* saga() {
  yield all([fork(watchSendNewBookSaga)]);
}
