import React, { Component } from "react";
import BookList from "../BooksList";
import FilterBooks from "../FilterBooks";
import { Helmet } from "react-helmet";

export default class BooksPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>All Books Routes</title>
          <link
            rel="canonical"
            href="http://booksroutes.azurewebsites.net/books"
          />
        </Helmet>
        <FilterBooks />
        <BookList />
      </div>
    );
  }
}
