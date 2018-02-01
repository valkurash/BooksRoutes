import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/booksActions';
import Book from '../Book';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { fetchBooks } = this.props;
    fetchBooks();
  }
  render() {
    const { books } = this.props;

    const bookElements = books.map((book) => (
      <Book key={book.id} book={book} />
    ));

    return <div className="book-list">{bookElements}</div>;
  }
}
export default connect(
  (state) => {
    return {
      books: state.books,
    };
  },
  { fetchBooks }
)(BookList);
