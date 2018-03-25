import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";

const newBookDataRecord = Record({
  title: "",
  authors: "",
  route: "",
  points: []
});

const defaultBookState = new newBookDataRecord();

export const newBookReducer = (state = defaultBookState, action) => {
  const { type, payload } = action;
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
    case actionTypes.SEND_NEW_BOOK:
      console.log(state);
      return defaultBookState;
    default:
      return state;
  }
};
