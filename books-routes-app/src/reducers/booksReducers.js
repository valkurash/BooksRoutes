import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";
import { arrToMap } from "./utils";
import { initialStoreState } from "../store/configureStore";

const bookForListRecord = Record({
  id: null,
  title: null,
  cover: null,
  description: null,
  authors: null
});

const defaultBooksState = Record({
  entities: arrToMap([], bookForListRecord),
  loading: false,
  loaded: false,
  error: false
});

export const booksReducer = (
  state = initialStoreState.get("books") || new defaultBooksState(),
  action
) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS + actionTypes.SUCCESS:
      return state
        .set("entities", arrToMap(action.response, bookForListRecord))
        .set("loading", false)
        .set("loaded", true)
        .set("error", false);
    case actionTypes.FETCH_BOOKS + actionTypes.START:
      return state.set("loading", true);
    case actionTypes.FETCH_BOOKS + actionTypes.FAIL:
      return state
        .set("loading", false)
        .set("loaded", false)
        .set("error", action.error);
    default:
      return state;
  }
};
