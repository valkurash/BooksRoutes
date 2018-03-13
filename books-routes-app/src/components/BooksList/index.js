import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";
import Book from "../Book";
import { filtratedBooksSelector } from "../../selectors";
import { GridList } from "material-ui/GridList";
import "./style.css";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    fetchBooks: PropTypes.func
  };

  componentDidMount() {
    const { loading, loaded, fetchBooks } = this.props;
    if (!loading && !loaded) fetchBooks();
  }
  render() {
    const { books, loading, error } = this.props;

    if (loading) return <div className="loader">Loading...</div>;

    if (error) return <div className="errorMsg">{error.message}</div>;

    const bookElements = books.map(book => <Book key={book.id} book={book} />);

    return (
      <div className="bookListWrap">
        <GridList cellHeight={180} className="bookGridList">
          {bookElements}
        </GridList>
      </div>
    );
  }
}
export default connect(
  state => ({
    books: filtratedBooksSelector(state),
    loading: state.get("books").loading,
    loaded: state.get("books").loaded,
    error: state.get("books").error
  }),
  { fetchBooks }
)(BookList);
