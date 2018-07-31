import React, { Component } from "react";
import BookList from "../BooksList";
import FilterBooks from "../FilterBooks";
import { Helmet } from "react-helmet";

export default class BooksPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Туристические маршруты по мотивам книг</title>
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
            content="Туристические маршруты по мотивам книг"
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
        <FilterBooks />
        <BookList />
      </div>
    );
  }
}
