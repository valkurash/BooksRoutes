import React, { Component } from "react";
import { FormControl } from "material-ui/Form";
import TextField from "material-ui/TextField";
import RouteMapSuggestion from "../RouteMapSuggestion";

export default class BookForm extends Component {
  state = {
    title: "",
    author: "",
    route: "",
    points: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <FormControl component="fieldset">
            <TextField
              required
              id="title"
              label="Book title"
              value={this.state.title}
              onChange={this.handleChange("title")}
              margin="normal"
            />
            <TextField
              required
              id="author"
              label="Author"
              value={this.state.author}
              onChange={this.handleChange("author")}
              helperText="If there are several authors, then separate them with a comma"
              margin="normal"
            />
            <TextField
              required
              id="route"
              label="Route name or description"
              value={this.state.route}
              onChange={this.handleChange("route")}
              helperText="Suggest your route"
              margin="normal"
              multiline
            />
          </FormControl>
        </form>
        <RouteMapSuggestion />
      </div>
    );
  }
}
