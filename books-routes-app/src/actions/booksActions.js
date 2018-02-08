import * as actionTypes from "../constants/ActionTypes";
import fixtures from "../constants/fixtures";

export function fetchBooks() {
  return {type: actionTypes.FETCH_BOOKS, callAPI: 'http://localhost:1337/api/v1/books'}
}
export const searchTermChanged = searchTerm => {
  return {type: actionTypes.SEARCH_INPUT_CHANGED, searchTerm};
};
