import {combineReducers} from "redux-immutable";
import {routerReducer as router} from "react-router-redux";
import {booksReducer} from "./booksReducers";
import {filtersReducer} from "./filtersReducer";

export default combineReducers({router, books: booksReducer, filters: filtersReducer});
