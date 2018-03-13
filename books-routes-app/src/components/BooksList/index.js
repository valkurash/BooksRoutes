import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";
import { filtratedBooksSelector } from "../../selectors";
import { Link } from "react-router-dom";
import Grid from "material-ui/Grid";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
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

    const bookElements = books.map(book => (
      <Grid key={book.id} item xs={12} sm={6} md={3} xl={2}>
        <Card className="book-item">
          <CardHeader
            title={<Link to={`/books/${book.id}`}>{book.title}</Link>}
            subheader={book.authors.map(author => author.name).join(", ")}
          />
          <CardMedia
            className="book-cover"
            image={book.cover}
            title={book.title}
          />
          <CardContent>
            <Typography component="p">{`${book.description.substring(
              0,
              250
            )}...`}</Typography>
          </CardContent>
        </Card>
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
