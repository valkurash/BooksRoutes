import * as actionTypes from "../constants/ActionTypes";

const initialFilters = {
  searchTerm: "",
  selectedCountries: [],
  selectedLanguages: [],
  languages: [],
  countries: [],
  loading: false,
  loaded: false,
  error: false
};

export const filtersReducer = (filters = initialFilters, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_INPUT_CHANGED:
      return {
        ...filters,
        searchTerm: action.searchTerm
      };
    case actionTypes.COUNTRIES_CHANGED:
      return {
        ...filters,
        selectedCountries: action.selectedCountries
      };
    case actionTypes.LANGUAGES_CHANGED:
      return {
        ...filters,
        selectedLanguages: action.selectedLanguages
      };
    case actionTypes.FETCH_COUNTRIES_LANGUAGES + actionTypes.SUCCESS:
      return {
        ...filters,
        languages: action.response.languages,
        countries: action.response.countries,
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
        error: action.error
      };
    default:
      return filters;
  }
};
