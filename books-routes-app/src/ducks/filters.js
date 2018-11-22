import { appName, api } from "../config";
import { createSelector } from "reselect";
import {
  createRequestTypes,
  action,
  fetchEntity,
  fetchActionCreator,
  REQUEST,
  SUCCESS,
  FAILURE
} from "./utils";
import { all, take, fork } from "redux-saga/effects";
/**
 * Actions
 * */
export const moduleName = "filters";

const prefix = `${appName}/${moduleName}`;

const COUNTRIES_LANGUAGES = createRequestTypes(`${prefix}/COUNTRIES_LANGUAGES`);
const FETCH_COUNTRIES_LANGUAGES = `${prefix}/FETCH_COUNTRIES_LANGUAGES`;

const SEARCH_INPUT_CHANGED = `${prefix}/SEARCH_INPUT_CHANGED`;
const COUNTRIES_CHANGED = `${prefix}/COUNTRIES_CHANGED`;
const LANGUAGES_CHANGED = `${prefix}/LANGUAGES_CHANGED`;
const FILTER_CHANGED = `${prefix}/FILTER_CHANGED`;

/**
 * Action Creators
 * */
const countriesLanguages = fetchActionCreator(COUNTRIES_LANGUAGES);

export function loadCountriesLanguages() {
  return action(FETCH_COUNTRIES_LANGUAGES);
}

export function searchTermChanged(searchTerm) {
  return action(SEARCH_INPUT_CHANGED, { payload: { searchTerm } });
}
export function selectedCountriesChanged(selectedCountries) {
  return action(COUNTRIES_CHANGED, { payload: { selectedCountries } });
}
export function selectedLanguagesChanged(selectedLanguages) {
  return action(LANGUAGES_CHANGED, { payload: { selectedLanguages } });
}
export function filterChanged(filterQuery) {
  return action(FILTER_CHANGED, { payload: { filterQuery } });
}

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
    case COUNTRIES_LANGUAGES[SUCCESS]:
      return {
        ...filters,
        languages: response.languages,
        countries: response.countries,
        loading: false,
        loaded: true,
        error: false
      };
    case COUNTRIES_LANGUAGES[REQUEST]:
      return {
        ...filters,
        loading: true
      };

    case COUNTRIES_LANGUAGES[FAILURE]:
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
 * Sagas
 **/
const fetchCountriesLanguagesSaga = fetchEntity.bind(
  null,
  countriesLanguages,
  () => `${api}/countries-languages`
);

function* watchFetchCountriesLanguagesSaga() {
  while (true) {
    const { payload } = yield take(FETCH_COUNTRIES_LANGUAGES);
    yield fork(fetchCountriesLanguagesSaga, payload);
  }
}

export function* saga() {
  yield all([fork(watchFetchCountriesLanguagesSaga)]);
}
