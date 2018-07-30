import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage";
import MarkerWithInfo from "../MarkerWithInfo";
import PathWithInfo from "../PathWithInfo";
const {
  compose,
  withProps,
  withStateHandlers,
  withHandlers,
  lifecycle
} = require("recompose");

const { withGoogleMap, GoogleMap } = require("react-google-maps");
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
const refs = { map: undefined };

const zoomToBound = (coords, fullMap) => {
  const bounds = new window.google.maps.LatLngBounds();
  coords.forEach(c => {
    bounds.extend(c);
  });
  if (fullMap) {
    refs.map.fitBounds(bounds);
  } else {
    //refs.map.panToBounds(bounds);
    refs.map.panTo(bounds.getCenter());
    refs.map.fitBounds(bounds);
  }
};

const MapWithAMarkedInfoWindow = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKSJA0XS-xvJTzsqwPBo1DqKSolCw_NeQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div style={{ height: `100%`, minHeight: "calc(100vh - 140px)" }} />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentDidUpdate() {
      zoomToBound(this.props.bound, true);
    }
  }),
  withStateHandlers(
    props => ({
      isOpen: props.route.points.reduce((acc, curr) => {
        acc[curr.id.toString()] = false;
        return acc;
      }, {}),
      isHovered: props.route.points.reduce((acc, curr) => {
        acc[curr.id.toString()] = false;
        return acc;
      }, {})
    }),
    {
      onToggleOpen: ({ isOpen }) => (id, flag) => {
        let state = { ...isOpen };
        if (state[id.toString()] === flag) return state;
        for (let key in state) {
          state[key.toString()] = false;
        }
        state[id.toString()] = flag;
        return { isOpen: state };
      },
      onToggleHover: ({ isHovered }) => (id, flag) => {
        let state = { ...isHovered };
        if (state[id.toString()] === flag) return state;
        for (let key in state) {
          state[key.toString()] = false;
        }
        state[id.toString()] = flag;
        return { isHovered: state };
      }
    }
  ),
  withHandlers({
    onMapMounted: props => ref => {
      if (ref) {
        refs.map = ref;
        zoomToBound(props.bound, true);
      }
    },
    zoomToBound: () => (path, fullMap) => zoomToBound(path, fullMap),
    panToMarker: () => latLng => {
      refs.map.panTo(latLng);
    },
    onMarkerClustererClick: () => markerClusterer =>
      markerClusterer.getMarkers()
  }),
  withGoogleMap
)(props => {
  const pointsData = props.route.points;
  const firstPoint = pointsData[0].point || pointsData[0].polyline[0];
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={8}
      defaultCenter={{
        lat: firstPoint.x || firstPoint.lat,
        lng: firstPoint.y || firstPoint.lng
      }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={40}
      >
        {pointsData.map(
          pointData =>
            pointData.point ? (
              <MarkerWithInfo
                key={pointData.order}
                pointData={pointData}
                isOpen={props.isOpen[pointData.id.toString()]}
                isHovered={props.isHovered[pointData.id.toString()]}
                onToggleOpen={props.onToggleOpen}
                onToggleHover={props.onToggleHover}
                panToMarker={props.panToMarker}
              />
            ) : (
              <PathWithInfo
                key={pointData.order}
                pointData={pointData}
                isOpen={props.isOpen[pointData.id.toString()]}
                isHovered={props.isHovered[pointData.id.toString()]}
                onToggleOpen={props.onToggleOpen}
                onToggleHover={props.onToggleHover}
                zoomToBound={props.zoomToBound}
              />
            )
        )}
      </MarkerClusterer>
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
    if (!route) return <NotFoundPage />;

    const bound = route.points.reduce((acc, pointData) => {
      return acc.concat(
        pointData.point
          ? {
              lat: pointData.point.x,
              lng: pointData.point.y
            }
          : pointData.polyline
      );
    }, []);
    return <MapWithAMarkedInfoWindow route={route} bound={bound} />;
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
