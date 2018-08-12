import { createSelector } from "reselect";

export const booksSelector = state =>
  state
    .get("books")
    .entities.valueSeq()
    .toArray();
export const filtersSelector = state => state.get("filters");

export const filtratedBooksSelector = createSelector(
  booksSelector,
  filtersSelector,
  (books, filters) => {
    const { searchTerm, selectedCountries, selectedLanguages } = filters;
    let filtered = books;
    if (searchTerm) {
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          book.authors
            .map(author => author.name)
            .join(", ")
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
      );
    }
    if (selectedCountries.length) {
      //TODO: memo func
      filtered = filtered.filter(book => {
        const routesCountries = book.routes.reduce(
          (acc, route) =>
            acc.concat(route.countries.map(country => country.ru_name)),
          []
        );
        return routesCountries.filter(
          country => -1 !== selectedCountries.indexOf(country)
        ).length;
      });
    }
    if (selectedLanguages.length) {
      //TODO: memo func
      filtered = filtered.filter(book => {
        const routesLanguages = book.routes.reduce(
          (acc, route) => acc.concat(route.languages.map(lang => lang.ru_name)),
          []
        );
        return routesLanguages.filter(
          lang => -1 !== selectedLanguages.indexOf(lang)
        ).length;
      });
    }
    return filtered;
  }
);
