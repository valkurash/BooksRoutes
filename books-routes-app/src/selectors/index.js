import {createSelector} from "reselect";

export const booksSelector = state => state
  .get('books')
  .entities
  .valueSeq()
  .toArray();
export const filtersSelector = state => state.get('filters');

export const filtratedBooksSelector = createSelector(booksSelector, filtersSelector, (books, filters) => {
  const {searchTerm} = filters;

  return searchTerm
    ? books.filter(book => book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || book.authors.map((author) => author.name).join(', ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
    : books;
});
