import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchTermChanged } from "../../actions/booksActions";
import TextField from "material-ui/TextField";

class FilterBooks extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    searchTermChanged: PropTypes.func.isRequired
  };

  render() {
    const { searchTerm, searchTermChanged } = this.props;

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="search"
          label="Искать книгу..."
          type="search"
          margin="normal"
          helperText="по названию или автору"
          value={searchTerm}
          onChange={e => searchTermChanged(e.target.value)}
          style={{ margin: "0 0 25px", maxWidth: 700 }}
          fullWidth
        />
      </form>
    );
  }
}
export default connect(
  state => {
    return {
      searchTerm: state.get("filters").searchTerm
    };
  },
  { searchTermChanged }
)(FilterBooks);
