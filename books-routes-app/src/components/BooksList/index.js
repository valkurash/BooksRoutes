import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks, showBooks } from "../../actions/booksActions";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import BookCard from "../BookCard";
import ContentLoader from "react-content-loader";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/ru_RU";

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
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0",
    "& .rc-pagination-item-active": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      "&:hover a": {
        color: "#fff"
      }
    },
    "& .rc-pagination-item:hover": {
      borderColor: theme.palette.primary.main,
      "& a": {
        color: theme.palette.primary.main
      }
    }
  }
});

class BookList extends Component {
  static propTypes = {
    booksData: PropTypes.shape({
      entities: PropTypes.array,
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
      paginationData: PropTypes.object
    }),
    fullQuery: PropTypes.string.isRequired,
    filterQuery: PropTypes.string.isRequired,
    defaultPageSize: PropTypes.number.isRequired,
    existedQueries: PropTypes.array,
    fetchBooks: PropTypes.func,
    showBooks: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { booksData, fetchBooks, fullQuery, filterQuery } = this.props;
    if (!booksData || (!booksData.get("loading") && !booksData.get("loaded")))
      fetchBooks(fullQuery, filterQuery);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
  render() {
    const {
      booksData,
      classes,
      theme,
      fetchBooks,
      showBooks,
      defaultPageSize,
      existedQueries,
      filterQuery
    } = this.props;
    if (!booksData) return null;

    const books = booksData.get("entities");
    const loading = booksData.get("loading");
    const error = booksData.get("error");
    const paginationData = booksData.get("paginationData");

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

    if (error)
      return (
        <div className="error-msg">{error.message || error.statusText}</div>
      );

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
                <BookCard book={book} />
              </Grid>
            ))}
        </Grid>
        <Pagination
          className={classes.pagination}
          onChange={newPage => {
            const q = `?page=${newPage}&pageSize=${defaultPageSize}${filterQuery}`;
            existedQueries.indexOf(q) > -1
              ? showBooks(q, filterQuery)
              : fetchBooks(q, filterQuery);
          }}
          current={paginationData.page}
          total={paginationData.rowCount}
          pageSize={paginationData.pageSize}
          defaultPageSize={defaultPageSize}
          hideOnSinglePage={true}
          locale={localeInfo}
        />
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
  state => {
    const fullQuery = state.get("books").fullQuery;
    return {
      booksData: state.get("books").entities.get(fullQuery),
      fullQuery: fullQuery,
      filterQuery: state.get("books").filterQuery,
      defaultPageSize: state.get("books").defaultPageSize,
      existedQueries: state
        .get("books")
        .entities.keySeq()
        .toArray()
    };
  },
  { fetchBooks, showBooks }
)(
  withStyles(styles, {
    withTheme: true,
    name: "BooksList",
    classNamePrefix: "books-list-"
  })(BookList)
);
