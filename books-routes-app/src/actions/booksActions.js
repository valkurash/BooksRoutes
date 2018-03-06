import * as actionTypes from "../constants/ActionTypes";

export function fetchBooks() {
  return {
    type: actionTypes.FETCH_BOOKS,
    callAPI: "http://localhost:1337/api/v1/books"
  };
}
export function fetchBook(id) {
  return {
    type: actionTypes.FETCH_BOOK,
    payload: { id },
    callAPI: `http://localhost:1337/api/v1/books/${id}`
  };
}
export const searchTermChanged = searchTerm => {
  return { type: actionTypes.SEARCH_INPUT_CHANGED, searchTerm };
};
