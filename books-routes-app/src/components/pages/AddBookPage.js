import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowIcon from "@material-ui/icons/ArrowLeft";
import BookForm from "../BookForm";
import { Helmet } from "react-helmet";

export default class AddBookPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Предложить маршрут из книги</title>
          <meta
            name="description"
            content="Литературная карта. Предложить маршруты для путешествий или обзорных экскурсий по местам из своих любимых книг"
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
        <BookForm />
      </div>
    );
  }
}
