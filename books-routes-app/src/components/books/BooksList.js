import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import BookCard from "./BookCard";
import ContentLoader from "react-content-loader";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  bookList: {
    flexGrow: 1
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
  }
});

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    classes: PropTypes.object.isRequired
  };

  render() {
    const { books, loading, error, classes } = this.props;

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
      </div>
    );
  }
}
export default withStyles(styles, {
  withTheme: true,
  name: "BooksList",
  classNamePrefix: "books-list-"
})(BookList);
