import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import BookList from "../components/books/BooksList";
import FilterBooks from "../components/filters/FilterBooks";
import {
  fetchBooks,
  showBooks,
  defaultPageSizeSelector,
  booksDataSelector,
  existedQueriesSelector
} from "../ducks/books";
import history from "../history";
import { filterQuerySelector } from "../ducks/filters";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 84px)"
  },
  content: { flex: "1 0 auto" },
  footer: {
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "#eee",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px 0"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0",
    "& .active-page": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: "#fff"
    }
  }
});

class BooksPage extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    filterQuery: PropTypes.string.isRequired,
    defaultPageSize: PropTypes.number.isRequired,
    existedQueries: PropTypes.array,
    fetchBooks: PropTypes.func,
    showBooks: PropTypes.func,
    booksData: PropTypes.shape({
      entities: PropTypes.array,
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
      paginationData: PropTypes.object
    })
  };
  componentDidMount() {
    const {
      booksData,
      fetchBooks,
      showBooks,
      pageId,
      defaultPageSize,
      filterQuery,
      existedQueries
    } = this.props;

    const q = `?page=${pageId}&pageSize=${defaultPageSize}${filterQuery}`;
    if (!booksData || (!booksData.get("loading") && !booksData.get("loaded")))
      fetchBooks(q);
    else {
      existedQueries.indexOf(q) > -1 ? showBooks(q) : fetchBooks(q);
    }
  }
  componentDidUpdate(prevProps) {
    const {
      existedQueries,
      fetchBooks,
      showBooks,
      pageId,
      defaultPageSize,
      filterQuery
    } = this.props;

    window.scrollTo(0, 0);
    if (pageId !== prevProps.pageId || filterQuery !== prevProps.filterQuery) {
      if (filterQuery !== prevProps.filterQuery && pageId !== "1")
        history.push("/books");
      const q = `?page=${pageId}&pageSize=${defaultPageSize}${filterQuery}`;
      existedQueries.indexOf(q) > -1 ? showBooks(q) : fetchBooks(q);
    }
  }

  render() {
    const { classes, theme, booksData, pageId } = this.props;

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };
    if (!booksData) return null;

    const books = booksData.get("entities");
    const loading = booksData.get("loading");
    const error = booksData.get("error");
    const paginationData = booksData.get("paginationData");

    const pageTitle = parseInt(pageId, 10) > 1 ? ` Страница ${pageId}` : "";
    const totalPages = paginationData
      ? Math.ceil(
          parseInt(paginationData.rowCount, 10) /
            parseInt(paginationData.pageSize, 10)
        )
      : null;
    const pagination =
      totalPages && totalPages > 1
        ? Array.from(Array(totalPages)).map((val, page) => (
            <Button
              key={page + 1}
              component={NavLink}
              to={`/books/page/${page + 1}`}
              variant="outlined"
              color="primary"
              className={pageId == page + 1 ? "active-page" : ""}
            >
              {page + 1}
            </Button>
          ))
        : null;

    return (
      <div className={classes.wrapper}>
        <Helmet>
          <title>{`Туристические маршруты по мотивам книг${pageTitle}`}</title>
          <meta
            name="description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta
            name="keywords"
            content="литературные маршруты, путешествия, туризм, экскурсии"
          />
          <meta property="og:url" content="https://booksroutes.info/books/" />
          <meta
            property="og:title"
            content={`Туристические маршруты по мотивам книг${pageTitle}`}
          />
          <meta
            property="og:description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://booksroutes.info/images/og-image.jpg"
          />
        </Helmet>
        <div className={classes.content}>
          <FilterBooks />
          <BookList books={books} loading={loading} error={error} />
          <div className={classes.pagination}>{pagination}</div>
        </div>
        <footer className={classes.footer}>
          <div className="mui-container mui--text-center">
            Made with ♥ by{" "}
            <a
              href="http://ideas-band.space"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ideas Band LLC
            </a>{" "}
            © 2018
          </div>
        </footer>
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
  (state, props) => {
    return {
      defaultPageSize: defaultPageSizeSelector(state),
      pageId: props.match.params.pageId || "1",
      filterQuery: filterQuerySelector(state),
      booksData: booksDataSelector(state),
      existedQueries: existedQueriesSelector(state)
    };
  },
  {
    fetchBooks,
    showBooks
  }
)(
  withStyles(styles, {
    withTheme: true,
    name: "BooksPage",
    classNamePrefix: "books-page-"
  })(BooksPage)
);
