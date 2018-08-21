import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ProgressiveImage from "react-progressive-image";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LanguageIcon from "@material-ui/icons/Language";
import TranslateIcon from "@material-ui/icons/Translate";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  bookCard: {
    overflow: "hidden",
    textAlign: "center",

    "&:hover": {
      backgroundColor: "#f9f9f9",
      "& .title": {
        color: "rgb(0, 105, 95)"
      }
    }
  },
  coverWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "calc(160% - 15px)"
  },
  cover: {
    position: "absolute",
    top: "15px",
    left: "15px",
    width: "calc(100% - 30px)",
    height: "calc(100% - 30px)"
  },
  info: {
    position: "absolute",
    top: "15px",
    left: "15px",
    width: "calc(100% - 30px)",
    height: "calc(100% - 30px)",
    backgroundColor: "#fff"
  },
  titleWrapper: {
    padding: "0 15px"
  },
  infoTitle: {
    margin: `0 ${theme.spacing.unit * 4}px`,
    lineHeight: `${theme.spacing.unit * 4}px`,
    textAlign: "center"
  },
  infoContent: {
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2,
    overflow: "auto",
    height: `calc(100% - ${theme.spacing.unit * 4}px)`
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    position: "absolute",
    top: "0",
    right: "0"
  },
  chip: {
    margin: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2,
    "& .btnIcon:not(:hover)": { background: "#fff" }
  }
});

class BookCard extends Component {
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
      ),
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string,
          countries: PropTypes.array.isRequired,
          languages: PropTypes.array.isRequired
        })
      )
    }),
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  state = {
    open: "cover"
  };
  handleOpen = item => {
    this.setState({ open: item });
  };

  handleClose = () => {
    this.setState({ open: "cover" });
  };
  formChips = (routes, key, classes) => {
    const uniqItems = routes.reduce((acc, route) => {
      route[key].forEach(item => (acc[item.id] = item.ru_name));
      return acc;
    }, {});
    return Object.keys(uniqItems).map(id => (
      <Chip
        key={id}
        label={uniqItems[id]}
        className={classes.chip}
        color="secondary"
      />
    ));
  };
  render() {
    const { book, classes } = this.props;

    if (!book) return null;

    return (
      <Paper className={classes.bookCard}>
        {this.state.open === "cover" && (
          <Link
            style={{
              textDecoration: "none"
            }}
            to={`/books/${book.id}/${book.routes[0].id}`}
          >
            <div className={classes.coverWrapper}>
              <div className={classes.cover}>
                <ProgressiveImage
                  src={book.cover}
                  placeholder={
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiNmZmYiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIzMjIiIHdpZHRoPSIyMDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHJlY3QgaWQ9InN2Z18xIiBoZWlnaHQ9IjMyMCIgd2lkdGg9IjIwMCIgeT0iMCIgeD0iMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmM2YzZjMiLz4KIDwvZz4KPC9zdmc+"
                  }
                >
                  {src => (
                    <img
                      style={{
                        display: "block",
                        width: "100%"
                      }}
                      src={src}
                      alt={book.title}
                    />
                  )}
                </ProgressiveImage>
              </div>
            </div>
          </Link>
        )}
        {this.state.open === "countries" && (
          <div className={classes.coverWrapper}>
            <div className={classes.info}>
              <IconButton
                key="close"
                aria-label="Close"
                color="primary"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                component="div"
                className={classes.infoTitle}
              >
                Страны
              </Typography>
              <div className={classes.infoContent}>
                {this.formChips(book.routes, "countries", classes)}
              </div>
            </div>
          </div>
        )}
        {this.state.open === "languages" && (
          <div className={classes.coverWrapper}>
            <div className={classes.info}>
              <IconButton
                key="close"
                aria-label="Close"
                color="primary"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                component="div"
                className={classes.infoTitle}
              >
                Языки
              </Typography>
              <div className={classes.infoContent}>
                {this.formChips(book.routes, "languages", classes)}
              </div>
            </div>
          </div>
        )}
        <Link
          style={{
            textDecoration: "none"
          }}
          to={`/books/${book.id}/${book.routes[0].id}`}
        >
          <div className={classes.titleWrapper}>
            <Typography variant="title" component="div" className="title">
              {book.title}
            </Typography>
            <Typography variant="subheading" component="div" className="title">
              {book.authors.map(author => author.name).join(", ")}
            </Typography>
          </div>
        </Link>
        <div className={classes.buttonsWrapper}>
          <IconButton
            className="btnIcon"
            key="countries"
            aria-label="Countries"
            color="secondary"
            onClick={() => this.handleOpen("countries")}
          >
            <LanguageIcon />
          </IconButton>
          <IconButton
            className="btnIcon"
            key="languages"
            aria-label="Languages"
            color="secondary"
            onClick={() => this.handleOpen("languages")}
          >
            <TranslateIcon />
          </IconButton>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles, {
  withTheme: true,
  name: "BookCard",
  classNamePrefix: "books-card-"
})(BookCard);
