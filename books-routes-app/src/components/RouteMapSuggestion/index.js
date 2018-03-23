import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const {
  compose,
  withProps,
  withStateHandlers,
  lifecycle,
  withHandlers
} = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKSJA0XS-xvJTzsqwPBo1DqKSolCw_NeQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, maxWidth: "500px" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    props => ({
      isOpen: props.points.reduce((acc, curr) => {
        acc[curr.id.toString()] = false;
        return acc;
      }, {})
    }),
    {
      onToggleOpen: ({ isOpen }) => id => {
        let state = { ...isOpen };
        state[id.toString()] = !isOpen[id.toString()];
        return { isOpen: state };
      }
    }
  ),
  withHandlers(() => {
    const refs = {
      map: undefined
    };
    return {
      onMapMounted: () => ref => {
        if (ref) {
          refs.map = ref;
        }
      }
    };
  }),
  lifecycle({
    componentDidUpdate(props) {
      props.zoomToMarkers();
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />
  );
});

class RouteMapSuggestion extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired
  };

  render() {
    const { points } = this.props;
    return <Map points={points} />;
  }
}
export default connect(state => ({
  points: state.get("newBook").get("points")
}))(RouteMapSuggestion);
