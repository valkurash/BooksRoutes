import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import CustomSnackbarContentWrapper from "../decorators/customSnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import RouteMapSuggestion from "./RouteMapSuggestion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeNewBooksData, sendNewBook, stateSelector as newBookSelector } from "../../ducks/newBook";

class BookForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    authors: PropTypes.string,
    route: PropTypes.string,
    googleMyMaps: PropTypes.string,
    points: PropTypes.array,
    changeNewBooksData: PropTypes.func.isRequired,
    sendNewBook: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  };

  state = {
    close: false,
    validation: ["title", "authors", "route"],
    titleError: false,
    authors: false,
    route: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ close: true });
  };

  render() {
    const {
      title,
      authors,
      route,
      points,
      googleMyMaps,
      changeNewBooksData,
      sendNewBook,
      loading,
      loaded,
      error
    } = this.props;

    const handleSubmit = () => {
      let valid = true;
      this.state.validation.forEach(el => {
        let name = `${el}Error`;
        if (!this.props[el]) {
          valid = false;
          this.setState({ [name]: true });
        } else {
          this.setState({ [name]: false });
        }
      });
      if (valid) {
        this.setState({ close: false });
        sendNewBook({ title, authors, route, points, googleMyMaps });
      }
    };
    return (
      <div>
        <form noValidate autoComplete="off">
          <Grid container spacing={24}>
            <Grid item xs={12} md={4}>
              <TextField
                error={this.state.titleError}
                required
                id="title"
                label="Название книги"
                value={title}
                onChange={e => changeNewBooksData("title", e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                error={this.state.authorsError}
                required
                id="authors"
                label="Автор"
                value={authors}
                onChange={e => changeNewBooksData("authors", e.target.value)}
                helperText="Если авторов несколько, перечислите их через запятую"
                margin="normal"
                fullWidth
              />
              <TextField
                error={this.state.routeError}
                required
                id="route"
                label="Название или описание маршрута"
                value={route}
                onChange={e => changeNewBooksData("route", e.target.value)}
                helperText="Предложите свой маршрут"
                margin="normal"
                multiline
                rows="4"
                fullWidth
              />
              <TextField
                id="googlemymaps"
                label="Ссылка на маршрут в Google My Maps"
                value={googleMyMaps}
                onChange={e =>
                  changeNewBooksData("googleMyMaps", e.target.value)
                }
                helperText="Этот маршрут должен быть доступен для просмотра всем пользователям, имеющим ссылку"
                margin="normal"
                fullWidth
              />
              <Button
                variant="raised"
                color="secondary"
                size="large"
                style={{ margin: "15px 0" }}
                onClick={() => handleSubmit()}
              >
                Отправить
              </Button>
              {loading && (
                <CircularProgress
                  className="loader"
                  style={{ display: "block", margin: "auto" }}
                  size={50}
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <FormLabel component="legend" style={{ margin: "15px 0 0 0" }}>
                Точки маршрута
              </FormLabel>
              <FormLabel
                component="legend"
                style={{ margin: "10px 0 15px 0", fontSize: ".8rem" }}
              >
                Если маршрут включает более сложную геометрию, например, пути
                или целые области, то лучше составить его в{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/d/u/0/"
                >
                  Google My Maps
                </a>{" "}
                и указать ссылку на него в этой форме.
              </FormLabel>
              <RouteMapSuggestion />
            </Grid>
          </Grid>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!this.state.close && !!error}
          autoHideDuration={6000}
        >
          <CustomSnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            message={
              error
                ? error.statusText
                : "Произошла ошибка, повторите попытку позднее"
            }
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!this.state.close && loaded}
          autoHideDuration={6000}
        >
          <CustomSnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Ваше предложение принято, спасибо!"
          />
        </Snackbar>
      </div>
    );
  }
}
export default connect(
  state => ({
    title: newBookSelector(state).get("title"),
    authors: newBookSelector(state).get("authors"),
    route: newBookSelector(state).get("route"),
    googleMyMaps: newBookSelector(state).get("googleMyMaps"),
    points: newBookSelector(state).get("points"),
    loading: newBookSelector(state).get("loading"),
    loaded: newBookSelector(state).get("loaded"),
    error: newBookSelector(state).get("error")
  }),
  dispatch => ({
    changeNewBooksData: (name, value) =>
      dispatch(changeNewBooksData(name, value)),
    sendNewBook: bookData => dispatch(sendNewBook(bookData))
  })
)(BookForm);
