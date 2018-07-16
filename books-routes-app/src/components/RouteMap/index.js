import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const {
  compose,
  withProps,
  withStateHandlers,
  withHandlers
} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline
} = require("react-google-maps");

const MapWithAMarkedInfoWindow = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKSJA0XS-xvJTzsqwPBo1DqKSolCw_NeQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, minHeight: "500px" }} />,
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
        for (let key in state) {
          state[key.toString()] = false;
        }
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
  withScriptjs,
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
      {pointsData.map(
        (pointData, index) =>
          pointData.point ? (
            <Marker
              key={index}
              position={{
                lat: pointData.point.x,
                lng: pointData.point.y
              }}
              onClick={() => props.onToggleOpen(pointData.id)}
            >
              {props.isOpen[pointData.id.toString()] && (
                <InfoWindow
                  onCloseClick={() => props.onToggleOpen(pointData.id)}
                  options={{ maxWidth: 250 }}
                >
                  <div>
                    <div
                      className="point-header"
                      style={{ fontWeight: "bold" }}
                    >{`${pointData.order}. ${pointData.name}`}</div>
                    <div className="point-descr">
                      {(pointData.description || "")
                        .split("\n")
                        .map((item, key) => {
                          return (
                            <div key={key}>
                              <span
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ) : (
            <div key={index}>
              <Polyline
                path={pointData.polyline}
                options={{
                  geodesic: true,
                  strokeColor: "#FF0000",
                  strokeWeight: 5
                }}
                onClick={() => props.onToggleOpen(pointData.id)}
              />
              {props.isOpen[pointData.id.toString()] && (
                <InfoWindow
                  onCloseClick={() => props.onToggleOpen(pointData.id)}
                  options={{ maxWidth: 250 }}
                  position={
                    pointData.polyline.length === 2
                      ? {
                          lat:
                            (pointData.polyline[0].lat +
                              pointData.polyline[1].lat) /
                            2,
                          lng:
                            (pointData.polyline[0].lng +
                              pointData.polyline[1].lng) /
                            2
                        }
                      : pointData.polyline[
                          Math.floor(pointData.polyline.length / 2)
                        ]
                  }
                >
                  <div>
                    <div
                      className="point-header"
                      style={{ fontWeight: "bold" }}
                    >{`${pointData.order}. ${pointData.name}`}</div>
                    <div className="point-descr">
                      {(pointData.description || "")
                        .split("\n")
                        .map((item, key) => {
                          return (
                            <div key={key}>
                              <span
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </div>
          )
      )}
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
    return <MapWithAMarkedInfoWindow route={route} />;
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
