import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchTermChanged } from "../../actions/booksActions";

class FilterBooks extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    searchTermChanged: PropTypes.func.isRequired
  };

  render() {
    const { searchTerm, searchTermChanged } = this.props;

    return (
      <form>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => searchTermChanged(e.target.value)}
          />
        </div>
      </form>
    );
  }
}
export default connect(
  state => {
    return {
      searchTerm: state.searchTerm
    };
  },
  { searchTermChanged }
)(FilterBooks);
