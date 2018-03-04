import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class BookRoutesPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node
      }).isRequired
    }).isRequired
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>BookRoutesPage {match.params.id}</h1>
        <Link to="/">Back to all Books</Link>
      </div>
    );
  }
}
