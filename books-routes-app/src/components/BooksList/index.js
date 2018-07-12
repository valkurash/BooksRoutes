import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";
import { filtratedBooksSelector } from "../../selectors";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
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

    if (loading)
      return (
        <CircularProgress
          className="loader"
          style={{ display: "block", margin: "auto" }}
          size={50}
        />
      );

    if (error) return <div className="error-msg">{error.message}</div>;

    if (!books.length)
      return (
        <div>
          <div className="no-result">
            К сожалению, книг по текущему запросу найдено. Попробуйте повторить
            поиск позднее или оставьте заявку на добавление интересующей Вас
            книги или маршрута.
          </div>
          <Button
            variant="raised"
            color="primary"
            aria-label="add"
            component={Link}
            to="/add"
          >
            <AddIcon /> Предложить новую книгу
          </Button>
        </div>
      );
    const bookElements = books
      .sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
      .map(book => (
        <Grid key={book.id} item xs={12} sm={6} md={3} lg={2} xl={1}>
          <Paper className="book-card">
            <Link to={`/books/${book.id}`}>
              <div className="book-cover">
                <img className="cover" src={book.cover} alt={book.title} />
              </div>
              <Typography variant="title" component="div" classNme="title">
                {book.title}
              </Typography>
              <Typography variant="subheading" component="div" classNme="title">
                {book.authors.map(author => author.name).join(", ")}
              </Typography>
            </Link>
          </Paper>
        </Grid>
      ));

    return (
      <div className="book-list-wrap">
        <Grid container spacing={24}>
          {bookElements}
        </Grid>
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
