import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ProgressiveImage from "react-progressive-image";
import ozonLogo from "../../images/ozon_logo.png";
import litresLogo from "../../images/litres_logo.png";

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
      <div
        style={{
          padding: "10px",
          clear: "both",
          overflow: "hidden"
        }}
      >
        {(book.ozon || book.litres) && (
          <div
            className="book-links"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}
          >
            {book.litres && (
              <a href={book.litres} target="_blank" rel="noopener noreferrer">
                <img alt="litres_logo" src={litresLogo} />
              </a>
            )}
            {book.ozon && (
              <a href={book.ozon} target="_blank" rel="noopener noreferrer">
                <img alt="ozon_logo" src={ozonLogo} />
              </a>
            )}
          </div>
        )}
        <div className="book-cover">
          <ProgressiveImage
            className="cover"
            src={book.cover}
            placeholder={
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiNmZmYiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIzMjIiIHdpZHRoPSIyMDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHJlY3QgaWQ9InN2Z18xIiBoZWlnaHQ9IjMyMCIgd2lkdGg9IjIwMCIgeT0iMCIgeD0iMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmM2YzZjMiLz4KIDwvZz4KPC9zdmc+"
            }
          >
            {(src, loading) => (
              <img
                style={{ filter: loading ? "blur(5px)" : "none" }}
                src={src}
                alt={book.title}
              />
            )}
          </ProgressiveImage>
        </div>
        <Typography variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {book.authors.map(author => author.name).join(", ")}
        </Typography>
        <Typography
          style={{
            paddingTop: "10px"
          }}
          component="div"
        >
          {(book.description || "").split("\n").map((item, key) => {
            return <p key={key}>{item}</p>;
          })}
        </Typography>
      </div>
    );
  }
}
