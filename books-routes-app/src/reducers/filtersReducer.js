import * as actionTypes from "../constants/ActionTypes";

const initialFilters = {
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

export const filtersReducer = (filters = initialFilters, action) => {
  const { type, payload, response, error } = action;
  switch (type) {
    case actionTypes.SEARCH_INPUT_CHANGED:
      return {
        ...filters,
        searchTerm: payload.searchTerm
      };
    case actionTypes.COUNTRIES_CHANGED:
      return {
        ...filters,
        selectedCountries: payload.selectedCountries
      };
    case actionTypes.LANGUAGES_CHANGED:
      return {
        ...filters,
        selectedLanguages: payload.selectedLanguages
      };
    case actionTypes.FILTER_CHANGED:
      return {
        ...filters,
        filterQuery: payload.filterQuery
      };
    case actionTypes.FETCH_COUNTRIES_LANGUAGES + actionTypes.SUCCESS:
      return {
        ...filters,
        languages: response.languages,
        countries: response.countries,
        loading: false,
        loaded: true,
        error: false
      };
    case actionTypes.FETCH_COUNTRIES_LANGUAGES + actionTypes.START:
      return {
        ...filters,
        loading: true
      };

    case actionTypes.FETCH_COUNTRIES_LANGUAGES + actionTypes.FAIL:
      return {
        ...filters,
        loading: true,
        loaded: false,
        error: error
      };
    default:
      return filters;
  }
};
