import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";
import { filtratedBooksSelector } from "../../selectors";
import { Link } from "react-router-dom";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Paper from "material-ui/Paper";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
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
            Sorry, no books matched your search. Please try again later or you
            can suggest book you interested in or even add book with its routes
            yourself.
          </div>
          <Button
            variant="raised"
            color="primary"
            aria-label="add"
            component={Link}
            to="/add"
          >
            <AddIcon /> Suggest new book
          </Button>
        </div>
      );
    const bookElements = books.map(book => (
      <Grid key={book.id} item xs={12} sm={6} md={3} lg={2} xl={1}>
        <Paper className="book-card">
          <div className="book-cover">
            <Link to={`/books/${book.id}`}>
              <img className="cover" src={book.cover} alt={book.title} />
            </Link>
          </div>
          <Paper className="book-heading" color="primary">
            <Typography variant="title" component="div">
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </Typography>
            <Typography variant="subheading" component="div">
              {book.authors.map(author => author.name).join(", ")}
            </Typography>
          </Paper>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subheading">Description</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography
                component="p"
                style={{ wordBreak: "break-word" }}
              >{`${book.description.substring(0, 250)}...`}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
