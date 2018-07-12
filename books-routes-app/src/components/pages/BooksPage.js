import React, { Component } from "react";
import BookList from "../BooksList";
import FilterBooks from "../FilterBooks";
import { Helmet } from "react-helmet";

export default class BooksPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Маршруты по книгам</title>
          <meta name="description" content="Литературная карта. Маршруты для путешествий или обзорных экскурсий по местам из своих любимых книг." />
        </Helmet>
        <FilterBooks />
        <BookList />
      </div>
    );
  }
}
