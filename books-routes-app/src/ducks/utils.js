import { Map } from "immutable";
import { put, call } from "redux-saga/effects";

export function arrToMap(arr, RecordModel = Map, key = "id") {
  return arr.reduce(
    (acc, item) => acc.set(item[key], new RecordModel(item)),
    new Map({})
  );
}

export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, data = {}) {
  return { type, ...data };
}
export function fetchActionCreator(type) {
  return {
    request: payload => action(type[REQUEST], { payload }),
    success: (payload, response) =>
      action(type[SUCCESS], { payload, ...response }),
    failure: (payload, error) => action(type[FAILURE], { payload, ...error })
  };
}
// resuable fetch Subroutine
// entity :  books | book | filters | newBook | ...
// apiFn  : payload => `${api}/books/${payload.fullQuery}` |  ...
// payload: fullQuery | id | ...
export function* fetchEntity(entity, apiFn, payload, method = "GET") {
  yield put(entity.request(payload));
  try {
    const response = yield call(fetchAPI, apiFn(payload), payload, method);
    yield put(entity.success(payload, response));
  } catch (error) {
    yield put(entity.failure(payload, error));
  }
}

export function fetchAPI(callAPI, payload, method = "GET") {
  let options = {};
  if (method === "POST")
    options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    };

  return fetch(callAPI, options)
    .then(res => {
      if (!res.ok) {
        throw new (res => res)(res);
      }
      // Read the response as json.
      return res.json();
    })
    .then(response => {
      if (response.status === "success") {
        return Promise.resolve({ response: response.data });
      } else {
        return Promise.reject({
          status: response.status,
          message: response.message
        });
      }
    })
    .catch(error => Promise.reject({ error }));
}
