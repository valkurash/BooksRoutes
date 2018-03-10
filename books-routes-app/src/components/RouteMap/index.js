import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");

const MapWithAMakredInfoWindow = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKSJA0XS-xvJTzsqwPBo1DqKSolCw_NeQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
      lat: props.route.points[0].point.y,
      lng: props.route.points[0].point.x
    }}
  >
    <Marker
      position={{
        lat: props.route.points[0].point.y,
        lng: props.route.points[0].point.x
      }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>{props.route.points[0].description}</div>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

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
      // TODO points
    })
  };

  render() {
    const { route } = this.props;
    return (
      <div className="routeMap">
        {route.name}
        <MapWithAMakredInfoWindow route={route} />
      </div>
    );
  }
}
export default connect((state, props) => ({
  route: state
    .get("singleBooks")
    .get("entities")
    .get(props.match.params.bookId)
    .get("entities")
    .get("routes")
    .find(route => route.id.toString() === props.match.params.routeId)
}))(RouteMap);
