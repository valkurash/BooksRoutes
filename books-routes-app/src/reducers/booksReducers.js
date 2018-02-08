import * as actionTypes from "../constants/ActionTypes";

export const booksReducer = (books = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS + actionTypes.SUCCESS:
      return action.response;
    default:
      return books;
  }
};
