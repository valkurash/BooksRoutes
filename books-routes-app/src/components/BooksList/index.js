import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";
import { filtratedBooksSelector } from "../../selectors";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContentLoader from "react-content-loader";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { withStyles } from "@material-ui/core/styles";
import ProgressiveImage from "react-progressive-image";

const styles = theme => ({
  bookList: {
    flexGrow: 1
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  bookCard: {
    overflow: "hidden",
    textAlign: "center",
    padding: "15px",
    "&:hover": {
      backgroundColor: "#f9f9f9",
      "& .title": {
        color: "rgb(0, 105, 95)"
      }
    }
  },
  coverWrapper: {
    marginBottom: "15px",
    position: "relative",
    width: "100%",
    paddingTop: "160%"
  },
  cover: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%"
  }
});

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    fetchBooks: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { loading, loaded, fetchBooks } = this.props;
    if (!loading && !loaded) fetchBooks();
  }
  render() {
    const { books, loading, error, classes, theme } = this.props;

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };

    const range = n => {
      let arr = [];
      for (var i = 0; i < n; i++) {
        arr.push(i);
      }
      return arr;
    };

    if (loading)
      return (
        <div className={classes.bookList}>
          <Grid container spacing={24}>
            {range(12).map(el => (
              <Grid key={el} item xs={12} sm={6} md={3} lg={2}>
                <Paper className={classes.bookCard}>
                  <ContentLoader height={385} width={200}>
                    <rect x="0" y="0" rx="0" ry="0" width="200" height="320" />
                    <rect
                      x="10"
                      y="340"
                      rx="4"
                      ry="4"
                      width="180"
                      height="20"
                    />
                    <rect
                      x="25"
                      y="370"
                      rx="3"
                      ry="3"
                      width="150"
                      height="15"
                    />
                  </ContentLoader>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      );

    if (error) return <div className="error-msg">{error.message}</div>;

    if (!books.length)
      return (
        <div className={classes.bookList}>
          <div style={{ marginBottom: "15px" }}>
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

    return (
      <div className={classes.bookList}>
        <Grid container spacing={24}>
          {books
            .sort((a, b) => {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            })
            .map(book => (
              <Grid key={book.id} item xs={12} sm={6} md={3} lg={2}>
                <Paper className={classes.bookCard}>
                  <Link
                    style={{
                      textDecoration: "none"
                    }}
                    to={`/books/${book.id}`}
                  >
                    <div className={classes.coverWrapper}>
                      <div className={classes.cover}>
                        <ProgressiveImage
                          src={book.cover}
                          placeholder={
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiNmZmYiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIzMjIiIHdpZHRoPSIyMDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHJlY3QgaWQ9InN2Z18xIiBoZWlnaHQ9IjMyMCIgd2lkdGg9IjIwMCIgeT0iMCIgeD0iMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmM2YzZjMiLz4KIDwvZz4KPC9zdmc+"
                          }
                        >
                          {src => (
                            <img
                              style={{
                                display: "block",
                                width: "100%"
                              }}
                              src={src}
                              alt={book.title}
                            />
                          )}
                        </ProgressiveImage>
                      </div>
                    </div>
                    <Typography
                      variant="title"
                      component="div"
                      className="title"
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="subheading"
                      component="div"
                      className="title"
                    >
                      {book.authors.map(author => author.name).join(", ")}
                    </Typography>
                  </Link>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <Zoom
          key="secondary"
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: transitionDuration.exit
          }}
          unmountOnExit
        >
          <Button
            component={Link}
            to="/add"
            variant="fab"
            className={classes.fab}
            color="secondary"
          >
            <AddIcon />
          </Button>
        </Zoom>
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
)(
  withStyles(styles, {
    withTheme: true,
    name: "BooksList",
    classNamePrefix: "books-list-"
  })(BookList)
);
