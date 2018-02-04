import { createSelector } from "reselect";

export const booksSelector = state => state.books;
export const filtersSelector = state => state.filters;

export const filtratedBooksSelector = createSelector(
  booksSelector,
  filtersSelector,
  (books, filters) => {
    const { searchTerm } = filters;

    return searchTerm
      ? books.filter(
          book =>
            book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        )
      : books;
  }
);
