import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowIcon from "@material-ui/icons/ArrowLeft";
import BookForm from "../components/newBook/BookForm";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { sendNewBook } from "../ducks/newBook";

class AddBookPage extends Component {
  state = {
    close: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ close: true });
  };

  handleSubmit = values => {
    this.setState({ close: false });
    sendNewBook({
      title: values.get("title"),
      authors: values.get("authors"),
      route: values.get("route"),
      points: values.get("googleMyMaps"),
      googleMyMaps: values.get("googleMyMaps")
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>
            Предложить туристический маршрут по мотивам любимой книги
          </title>
          <meta
            name="description"
            content="Предложить свой литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta
            name="keywords"
            content="литературные маршруты, путешествия, туризм, экскурсии"
          />
          <meta property="og:url" content="https://booksroutes.info/add/" />
          <meta
            property="og:title"
            content="Предложить туристический маршрут по мотивам любимой книги"
          />
          <meta
            property="og:description"
            content="Предложить свой литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content="https://booksroutes.info/images/og-image.jpg"
          />
        </Helmet>
        <Link
          to="/books"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <ArrowIcon />
          <Typography variant="subheading" component="span">
            Вернуться к списку книг
          </Typography>
        </Link>
        <Typography
          style={{ textAlign: "center", padding: "15px 0" }}
          color="inherit"
          variant="title"
          noWrap={true}
          component="h2"
        >
          Предложить туристический маршрут по мотивам любимой книги
        </Typography>
        <BookForm
          handleClose={this.handleClose}
          onSubmit={this.handleSubmit}
          close={this.state.close}
        />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    sendNewBook: bookData => dispatch(sendNewBook(bookData))
  })
)(AddBookPage);
