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
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    props => ({
      isOpen: props.route.points.reduce((acc, curr) => {
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
    const zoomToMarkers = () => {
      const bounds = new window.google.maps.LatLngBounds();
      refs.map.props.children.forEach(child => {
        if (child.type === Marker) {
          bounds.extend(
            new window.google.maps.LatLng(
              child.props.position.lat,
              child.props.position.lng
            )
          );
        }
      });
      refs.map.fitBounds(bounds);
    };
    return {
      onMapMounted: () => ref => {
        if (ref) {
          refs.map = ref;
          zoomToMarkers();
        }
      },
      zoomToMarkers: () => zoomToMarkers
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
  const points = props.route.points;
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={8}
      defaultCenter={{
        lat: points[0].point.y,
        lng: points[0].point.x
      }}
    >
      {points.map((point, index) => (
        <Marker
          key={index}
          position={{
            lat: point.point.y,
            lng: point.point.x
          }}
          onClick={() => props.onToggleOpen(point.id)}
        >
          {props.isOpen[point.id.toString()] && (
            <InfoWindow onCloseClick={() => props.onToggleOpen(point.id)}>
              <div>
                <div className="point-header">{`${point.order}. ${
                  point.name
                }`}</div>
                <div className="point-descr">{point.description}</div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
});

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
    return <MapWithAMakredInfoWindow route={route} />;
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
