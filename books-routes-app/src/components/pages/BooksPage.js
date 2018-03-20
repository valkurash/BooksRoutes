import React, { Component } from "react";
import BookList from "../BooksList";
import FilterBooks from "../FilterBooks";
import DocumentMeta from "react-document-meta";

const meta = {
  title: "All Books Routes",
  description: "All Books Routes List",
  canonical: "http://booksroutes.azurewebsites.net/books",
  meta: {
    charset: "utf-8",
    name: {
      keywords: "books,routes,maps,travel"
    }
  }
};
export default class BooksPage extends Component {
  render() {
    return (
      <DocumentMeta {...meta}>
        <FilterBooks />
        <BookList />
      </DocumentMeta>
    );
  }
}
