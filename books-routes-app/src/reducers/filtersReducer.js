import * as actionTypes from "../constants/ActionTypes";

const initialFilters = {
  searchTerm: ""
};

export const filtersReducer = (filters = initialFilters, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_INPUT_CHANGED:
      return {
        ...filters,
        searchTerm: action.searchTerm
      };
    default:
      return filters;
  }
};
