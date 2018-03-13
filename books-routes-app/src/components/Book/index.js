import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isbn: PropTypes.string,
      title: PropTypes.string.isRequired,
      cover_url: PropTypes.string,
      description: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          avatar: PropTypes.string.isRequired,
          name: PropTypes.string
        })
      )
    }),
    sidebar: PropTypes.bool
  };

  render() {
    const { book, sidebar } = this.props;

    const authors = book.authors.map(author => author.name).join(", ");
    const title = sidebar ? (
      <div className="title">{book.title}</div>
    ) : (
      <Link to={`/books/${book.id}`}>
        <div className="title">{book.title}</div>
      </Link>
    );
    if (!book) return null;

    return (
      <div className="book-item">
        <div className="cover">
          <img alt="book cover" src={book.cover} />
        </div>
        <div className="info">
          {title}
          <div className="authors">{authors}</div>
        </div>
        <div className="description">{book.description}</div>
      </div>
    );
  }
}
