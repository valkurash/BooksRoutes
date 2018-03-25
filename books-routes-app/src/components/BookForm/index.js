import React, { Component } from "react";
import { FormControl, FormLabel } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import RouteMapSuggestion from "../RouteMapSuggestion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeNewBooksData, sendNewBook } from "../../actions/booksActions";

class BookForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    authors: PropTypes.string,
    route: PropTypes.string,
    changeNewBooksData: PropTypes.func.isRequired,
    sendNewBook: PropTypes.func.isRequired
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const {
      title,
      authors,
      route,
      changeNewBooksData,
      sendNewBook
    } = this.props;
    return (
      <div>
        <form noValidate autoComplete="off">
          <FormControl component="fieldset">
            <TextField
              required
              id="title"
              label="Book title"
              value={title}
              onChange={e => changeNewBooksData("title", e.target.value)}
              margin="normal"
            />
            <TextField
              required
              id="author"
              label="Author"
              value={authors}
              onChange={e => changeNewBooksData("authors", e.target.value)}
              helperText="If there are several authors, then separate them with a comma"
              margin="normal"
            />
            <TextField
              required
              id="route"
              label="Route name or description"
              value={route}
              onChange={e => changeNewBooksData("route", e.target.value)}
              helperText="Suggest your route"
              margin="normal"
              multiline
            />
          </FormControl>
          <FormLabel component="legend" style={{ margin: "15px 0" }}>
            Add points
          </FormLabel>
          <RouteMapSuggestion />
        </form>
        <Button
          variant="raised"
          color="secondary"
          size="large"
          style={{ margin: "15px 0" }}
          onClick={() => sendNewBook()}
        >
          Submit
        </Button>
      </div>
    );
  }
}
export default connect(
  state => ({
    title: state.get("newBook").get("title"),
    authors: state.get("newBook").get("authors"),
    route: state.get("newBook").get("route")
  }),
  dispatch => ({
    changeNewBooksData: (name, value) =>
      dispatch(changeNewBooksData(name, value)),
    sendNewBook: () => dispatch(sendNewBook())
  })
)(BookForm);
