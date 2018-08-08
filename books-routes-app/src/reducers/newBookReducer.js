import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";

const newBookDataRecord = Record({
  title: "",
  authors: "",
  route: "",
  googleMyMaps: "",
  points: [],
  loading: false,
  loaded: false,
  error: false
});

export const newBookReducer = (state = new newBookDataRecord(), action) => {
  const { type, payload, error } = action;
  switch (type) {
    case actionTypes.CHANGE_NEW_BOOK_POINTS:
      return state.set("points", payload.points);
    case actionTypes.REMOVE_NEW_BOOK_POINTS:
      return state.set("points", [
        ...state.get("points").slice(0, payload.index),
        ...state.get("points").slice(payload.index + 1)
      ]);
    case actionTypes.ADD_DESCRIPTION_NEW_BOOK_POINTS:
      return state.set("points", [
        ...state.get("points").slice(0, payload.index),
        Object.assign({}, state.get("points")[payload.index], {
          description: payload.value
        }),
        ...state.get("points").slice(payload.index + 1)
      ]);
    case actionTypes.CHANGE_NEW_BOOK_DATA:
      return state.set(payload.name, payload.value);
    case actionTypes.SEND_NEW_BOOK + actionTypes.SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", false)
        .set("title", "")
        .set("googleMyMaps", "")
        .set("authors", "")
        .set("route", "")
        .set("points", []);

    case actionTypes.SEND_NEW_BOOK + actionTypes.START:
      return state.set("loading", true).set("loaded", false);
    case actionTypes.SEND_NEW_BOOK + actionTypes.FAIL:
      return state
        .set("loading", false)
        .set("loaded", false)
        .set("error", error);
    default:
      return state;
  }
};
