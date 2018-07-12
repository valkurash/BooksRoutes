import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import BookForm from "../BookForm";
import { Helmet } from "react-helmet";

export default class AddBookPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Предложить маршрут из книги</title>
          <meta name="description" content="Предложить маршруты для путешествий или обзорных экскурсий по местам из своих любимых книг" />
        </Helmet>
        <Link
          to="/books"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <ArrowIcon />
          Вернуться к списку книг
        </Link>
        <BookForm />
      </div>
    );
  }
}
