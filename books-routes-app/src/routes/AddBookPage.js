import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowIcon from "@material-ui/icons/ArrowLeft";
import BookForm from "../components/newBook/BookForm";
import { Helmet } from "react-helmet";

export default class AddBookPage extends Component {
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
          noWrap
          component="h2"
        >
          Предложить туристический маршрут по мотивам любимой книги
        </Typography>
        <BookForm />
      </div>
    );
  }
}
