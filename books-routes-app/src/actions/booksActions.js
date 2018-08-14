import * as actionTypes from "../constants/ActionTypes";

const api =
  process.env.NODE_ENV === "production"
    ? "https://booksroutes-api.azurewebsites.net/api/v1"
    : "http://localhost:1337/api/v1";

export function fetchBooks() {
  return {
    type: actionTypes.FETCH_BOOKS,
    callAPI: `${api}/books`
  };
}
export function fetchBook(id) {
  return {
    type: actionTypes.FETCH_BOOK,
    payload: { id },
    callAPI: `${api}/books/${id}`
  };
}
export const searchTermChanged = searchTerm => {
  return { type: actionTypes.SEARCH_INPUT_CHANGED, searchTerm };
};
export const selectedCountriesChanged = selectedCountries => {
  return { type: actionTypes.COUNTRIES_CHANGED, selectedCountries };
};
export const selectedLanguagesChanged = selectedLanguages => {
  return { type: actionTypes.LANGUAGES_CHANGED, selectedLanguages };
};

export const loadCountriesLanguages = () => {
  return {
    type: actionTypes.FETCH_COUNTRIES_LANGUAGES,
    callAPI: `${api}/countries-languages`
  };
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
    callAPI: `${api}/books`,
    method: "POST"
  };
}
