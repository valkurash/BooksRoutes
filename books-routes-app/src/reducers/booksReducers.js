import * as actionTypes from "../actions/actionTypes";

export const booksReducer = (books = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_SUCCESS:
      return action.books;
    default:
      return books;
  }
};
