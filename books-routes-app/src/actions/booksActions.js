import * as actionTypes from "./actionTypes";
import fixtures from "../constants/fixtures";

const fetchBooksSuccess = books => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books
  };
};

export const fetchBooks = () => {
  return dispatch => {
    /* return Axios.get(booksApiURL)
      .then(response => {
        dispatch(fetchBooksSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      }); */
    dispatch(fetchBooksSuccess(fixtures));
  };
};

export const searchTermChanged = searchTerm => {
  return {
    type: actionTypes.SEARCH_INPUT_CHANGED,
    searchTerm
  };
};
