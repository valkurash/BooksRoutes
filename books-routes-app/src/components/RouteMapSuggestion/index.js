import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changeNewBooksPoint,
  removeNewBooksPoint,
  newBookPointDescrChanged
} from "../../actions/booksActions";

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
  InfoWindow
} = require("react-google-maps");

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
      isOpen: props.points.reduce((acc, curr, index) => {
        acc[index.toString()] = false;
        return acc;
      }, {})
    }),
    {
      onToggleOpen: ({ isOpen }) => index => {
        let state = { ...isOpen };
        state[index.toString()] = !isOpen[index.toString()];
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
      },
      handleMapClick: props => event => {
        const { points, changeNewBooksPoint } = props;
        let newPoint = {
          position: event.latLng,
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          defaultAnimation: 0,
          key: Date.now(),
          description: ""
        };
        changeNewBooksPoint([...points, newPoint]);
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={3}
      defaultCenter={{ lat: 37.688, lng: 35.438 }}
      onClick={props.handleMapClick}
    >
      {props.points.map((point, index) => {
        return (
          <Marker
            key={point.key}
            {...point}
            onRightClick={() => props.removeNewBooksPoint(index)} //TODO: change for mobiles
            onClick={() => props.onToggleOpen(index)}
          >
            {props.isOpen[index.toString()] && (
              <InfoWindow onCloseClick={() => props.onToggleOpen(index)}>
                <div>
                  <textarea
                    placeholder="Description"
                    style={{ resize: "none" }}
                    rows="4"
                    value={point.description}
                    onChange={e =>
                      props.newBookPointDescrChanged(e.target.value, index)
                    }
                  />
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

class RouteMapSuggestion extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    changeNewBooksPoint: PropTypes.func.isRequired,
    removeNewBooksPoint: PropTypes.func.isRequired,
    newBookPointDescrChanged: PropTypes.func.isRequired
  };

  render() {
    const {
      points,
      changeNewBooksPoint,
      removeNewBooksPoint,
      newBookPointDescrChanged
    } = this.props;
    return (
      <Map
        points={points}
        changeNewBooksPoint={changeNewBooksPoint}
        removeNewBooksPoint={removeNewBooksPoint}
        newBookPointDescrChanged={newBookPointDescrChanged}
      />
    );
  }
}
export default connect(
  state => ({
    points: state.get("newBook").get("points")
  }),
  dispatch => ({
    changeNewBooksPoint: points => dispatch(changeNewBooksPoint(points)),
    removeNewBooksPoint: index => dispatch(removeNewBooksPoint(index)),
    newBookPointDescrChanged: (value, index) =>
      dispatch(newBookPointDescrChanged(value, index))
  })
)(RouteMapSuggestion);