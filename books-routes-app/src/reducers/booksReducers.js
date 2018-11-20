import { Record } from "immutable";
import { arrToMap } from "./utils";
import { initialStoreState } from "../redux";
import { appName } from "../config";

export const moduleName = "books";
console.log(moduleName);
const prefix = `${appName}/${moduleName}`;

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const FETCH_BOOKS = `${prefix}/FETCH_BOOKS`;
export const SHOW_BOOKS = `${prefix}/SHOW_BOOKS`;

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
};
