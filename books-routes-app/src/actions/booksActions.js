import * as actionTypes from "../constants/ActionTypes";

const api = "https://booksroutes-api.azurewebsites.net/api/v1/books";
//const api = "http://localhost:1337/api/v1/books";
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
export function changeNewBooksPoint(points) {
  return {
    type: actionTypes.CHANGE_NEW_BOOK_POINTS,
    payload: { points }
  };
}
export function removeNewBooksPoint(index) {
  return {
    type: actionTypes.REMOVE_NEW_BOOK_POINTS,
    payload: { index }
  };
}
export function newBookPointDescrChanged(value, index) {
  return {
    type: actionTypes.ADD_DESCRIPTION_NEW_BOOK_POINTS,
    payload: { value, index }
  };
}
export function changeNewBooksData(name, value) {
  return {
    type: actionTypes.CHANGE_NEW_BOOK_DATA,
    payload: { name, value }
  };
}
export function sendNewBook(bookData) {
  return {
    type: actionTypes.SEND_NEW_BOOK,
    payload: { ...bookData },
    callAPI: api,
    method: "POST"
  };
}
