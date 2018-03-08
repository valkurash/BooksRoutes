import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class RouteMap extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        bookId: PropTypes.node,
        routeId: PropTypes.node
      }).isRequired
    }).isRequired,
    route: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string
      //points
    })
  };

  render() {
    const { route } = this.props;
    return <div className="routeMap">{route.name}</div>;
  }
}
export default connect((state, props) => ({
  route: state
    .get("singleBooks")
    .get("entities")
    .get(props.match.params.bookId)
    .get("entities")
    .get("routes")
    .find(route => route.id == props.match.params.routeId)
}))(RouteMap);
