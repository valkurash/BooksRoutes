import React, { Component } from "react";
import { FormControl, FormLabel } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
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
        >
          Submit
        </Button>
      </div>
    );
  }
}
