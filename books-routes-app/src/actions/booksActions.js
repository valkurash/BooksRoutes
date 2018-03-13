import * as actionTypes from "../constants/ActionTypes";

const api = "https://booksroutes-api.azurewebsites.net/api/v1/books";
export function fetchBooks() {
  return {
    type: actionTypes.FETCH_BOOKS,
    callAPI: api
  };
}
export function fetchBook(id) {
  return {
    type: actionTypes.FETCH_BOOK,
    payload: { id },
    callAPI: `${api}/${id}`
  };
}
export const searchTermChanged = searchTerm => {
  return { type: actionTypes.SEARCH_INPUT_CHANGED, searchTerm };
};
