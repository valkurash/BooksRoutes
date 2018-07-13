import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
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
    })
  };

  render() {
    const { book } = this.props;

    if (!book) return null;

    return (
      <div className="book-item">
        <div className="book-cover">
          <img className="cover" src={book.cover} alt={book.title} />
        </div>
        <Typography variant="headline" component="div">
          {book.title}
        </Typography>
        <Typography variant="subheading" component="div">
          {book.authors.map(author => author.name).join(", ")}
        </Typography>
        <Typography className="book-descr" component="div">
          {(book.description || "").split("\n").map((item, key) => {
            return <p key={key}>{item}</p>;
          })}
        </Typography>
      </div>
    );
  }
}
