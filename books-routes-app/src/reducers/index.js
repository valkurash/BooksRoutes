import { combineReducers } from "redux-immutable";
import { routerReducer as router } from "react-router-redux";
import { booksReducer } from "./booksReducers";
import { bookReducer } from "./bookReducers";
import { filtersReducer } from "./filtersReducer";
import { newBookReducer } from "./newBookReducer";

export default combineReducers({
  router,
  books: booksReducer,
  singleBooks: bookReducer,
  filters: filtersReducer,
  newBook: newBookReducer
});
