import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";
import { arrToMap } from "./utils";
import { initialStoreState } from "../store/configureStore";

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

export const booksReducer = (
  state = initialStoreState.get("books") || new defaultBooksState(),
  action
) => {
  const { type, payload, response, error } = action;
  switch (type) {
    case actionTypes.SHOW_BOOKS:
      return state.set("fullQuery", payload.fullQuery);
    case actionTypes.FETCH_BOOKS + actionTypes.SUCCESS:
      return state
        .setIn(["entities", payload.fullQuery, "entities"], response.books)
        .setIn(
          ["entities", payload.fullQuery, "paginationData"],
          response.paginationData
        )
        .setIn(["entities", payload.fullQuery, "loading"], false)
        .setIn(["entities", payload.fullQuery, "loaded"], true)
        .setIn(["entities", payload.fullQuery, "error"], false);
    case actionTypes.FETCH_BOOKS + actionTypes.START:
      return state
        .set("fullQuery", payload.fullQuery)
        .setIn(["entities", payload.fullQuery, "loading"], true);
    case actionTypes.FETCH_BOOKS + actionTypes.FAIL:
      return state
        .setIn(["entities", payload.fullQuery, "loading"], false)
        .setIn(["entities", payload.fullQuery, "loaded"], false)
        .setIn(["entities", payload.fullQuery, "error"], error);
    default:
      return state;
  }
};
