import { appName, api } from "../config";
import { createSelector } from "reselect";
import { fetchAPI } from "./utils";
import { put, call, all, takeEvery } from "redux-saga/effects";
/**
 * Actions
 * */
export const moduleName = "filters";

const prefix = `${appName}/${moduleName}`;

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const SEARCH_INPUT_CHANGED = `${prefix}/SEARCH_INPUT_CHANGED`;
export const COUNTRIES_CHANGED = `${prefix}/COUNTRIES_CHANGED`;
export const LANGUAGES_CHANGED = `${prefix}/LANGUAGES_CHANGED`;
export const FILTER_CHANGED = `${prefix}/FILTER_CHANGED`;
export const FETCH_COUNTRIES_LANGUAGES = `${prefix}/FETCH_COUNTRIES_LANGUAGES`;

/**
 * Reducer
 * */
export const initialFilters = {
  searchTerm: "",
  selectedCountries: [],
  selectedLanguages: [],
  languages: [],
  countries: [],
  loading: false,
  loaded: false,
  error: false,
  filterQuery: ""
};

export default function reducer(filters = initialFilters, action) {
  const { type, payload, response, error } = action;
  switch (type) {
    case SEARCH_INPUT_CHANGED:
      return {
        ...filters,
        searchTerm: payload.searchTerm
      };
    case COUNTRIES_CHANGED:
      return {
        ...filters,
        selectedCountries: payload.selectedCountries
      };
    case LANGUAGES_CHANGED:
      return {
        ...filters,
        selectedLanguages: payload.selectedLanguages
      };
    case FILTER_CHANGED:
      return {
        ...filters,
        filterQuery: payload.filterQuery
      };
    case FETCH_COUNTRIES_LANGUAGES + SUCCESS:
      return {
        ...filters,
        languages: response.languages,
        countries: response.countries,
        loading: false,
        loaded: true,
        error: false
      };
    case FETCH_COUNTRIES_LANGUAGES + START:
      return {
        ...filters,
        loading: true
      };

    case FETCH_COUNTRIES_LANGUAGES + FAIL:
      return {
        ...filters,
        loading: true,
        loaded: false,
        error: error
      };
    default:
      return filters;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];

export const filterQuerySelector = createSelector(
  stateSelector,
  state => state.filterQuery
);

/**
 * Action Creators
 * */
export const searchTermChanged = searchTerm => {
  return { type: SEARCH_INPUT_CHANGED, payload: { searchTerm } };
};
export const selectedCountriesChanged = selectedCountries => {
  return {
    type: COUNTRIES_CHANGED,
    payload: { selectedCountries }
  };
};
export const selectedLanguagesChanged = selectedLanguages => {
  return {
    type: LANGUAGES_CHANGED,
    payload: { selectedLanguages }
  };
};
export const filterChanged = filterQuery => {
  return { type: FILTER_CHANGED, payload: { filterQuery } };
};
export const loadCountriesLanguages = () => {
  return {
    type: FETCH_COUNTRIES_LANGUAGES + START
  };
};

/**
 * Sagas
 **/
export function* fetchCountriesLanguagesSaga() {
  try {
    const result = yield call(fetchAPI, `${api}/countries-languages`);
    yield put({
      type: FETCH_COUNTRIES_LANGUAGES + SUCCESS,
      ...result
    });
  } catch (error) {
    yield put({
      type: FETCH_COUNTRIES_LANGUAGES + FAIL,
      ...error
    });
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_COUNTRIES_LANGUAGES + START, fetchCountriesLanguagesSaga)
  ]);
}
