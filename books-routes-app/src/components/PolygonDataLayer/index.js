import { PureComponent } from "react";
import PropTypes from "prop-types";

import { MAP } from "react-google-maps/lib/constants";

const addDataLayerPolygons = function(
  currentMap,
  polygonsInfo,
  onToggleOpen,
  onToggleHover,
  zoomToBound
) {
  if (!currentMap) {
    return;
  }
  // Call the Data class in the initial google map API
  let newData = new window.google.maps.Data();
  let newPolygonsDataArr = polygonsInfo.map(p => ({
    geometry: new window.google.maps.Data.MultiPolygon(p.polygon),
    properties: {
      id: p.id,
      color: p.strokeColor
    }
  }));
  try {
    newPolygonsDataArr.forEach(pData => {
      // Call the add method from the Data class
      newData.add(pData);
    });
    // Add some style.
    newData.setStyle(function(feature) {
      return /** @type {google.maps.Data.StyleOptions} */ ({
        strokeWeight: 4,
        fillOpacity: 0.2,
        fillColor: feature.getProperty("color"),
        strokeColor: feature.getProperty("color")
      });
    });
    // Set event for each feature.
    newData.addListener("click", function(event) {
      onToggleOpen(event.feature.getProperty("id"), true);
      const selectedPolygon = polygonsInfo.filter(
        p => p.id === event.feature.getProperty("id")
      );
      zoomToBound(
        selectedPolygon[0].polygon.reduce(
          (acc, wrap) =>
            acc.concat(wrap.reduce((acc, arr) => acc.concat(arr), [])),
          []
        ),
        false
      );
    });
    newData.addListener("mouseover", function(event) {
      onToggleHover(event.feature.getProperty("id"), true);
    });
    newData.addListener("mouseout", function(event) {
      onToggleHover(event.feature.getProperty("id"), false);
    });
  } catch (error) {
    newData.setMap(null);
    return;
  }

  // Set the data to the current map
  newData.setMap(currentMap.context[MAP]);
  return newData;
};

export default class PolygonDataLayer extends PureComponent {
  static propTypes = {
    polygonsData: PropTypes.array.isRequired,
    isOpenObj: PropTypes.object.isRequired,
    isHoveredObj: PropTypes.object.isRequired,
    onToggleOpen: PropTypes.func.isRequired,
    onToggleHover: PropTypes.func.isRequired,
    zoomToBound: PropTypes.func.isRequired,
    map: PropTypes.object
  };
  state = {
    features: []
  };

  componentDidUpdate(prevProps) {
    const {
      polygonsData,
      map,
      isOpenObj,
      isHoveredObj,
      onToggleOpen,
      onToggleHover,
      zoomToBound
    } = this.props;
    if (prevProps.map !== map) {
      let newFeatures = addDataLayerPolygons(
        map,
        polygonsData,
        onToggleOpen,
        onToggleHover,
        zoomToBound
      );
      this.setState({ features: newFeatures });
    } else if (
      prevProps.isOpenObj !== isOpenObj ||
      prevProps.isHoveredObj !== isHoveredObj
    ) {
      // Add some style.
      this.state.features.setStyle(function(feature) {
        return {
          strokeWeight:
            isOpenObj[feature.getProperty("id")] ||
            isHoveredObj[feature.getProperty("id")]
              ? 8
              : 4,
          fillOpacity:
            isOpenObj[feature.getProperty("id")] ||
            isHoveredObj[feature.getProperty("id")]
              ? 0.4
              : 0.2,
          fillColor: feature.getProperty("color"),
          strokeColor: feature.getProperty("color")
        };
      });
    }
  }
  componentDidMount() {
    const {
      polygonsData,
      map,
      onToggleOpen,
      onToggleHover,
      zoomToBound
    } = this.props;
    let newFeatures = addDataLayerPolygons(
      map,
      polygonsData,
      onToggleOpen,
      onToggleHover,
      zoomToBound
    );
    this.setState({ features: newFeatures });
  }

  componentWillUnmount() {
    const { isOpenObj, isHoveredObj, onToggleOpen, onToggleHover } = this.props;

    for (let key in isOpenObj) {
      onToggleOpen(key, false);
    }
    for (let key in isHoveredObj) {
      onToggleHover(key, false);
    }
    this.state.features.setMap(null);
  }

  render() {
    return false;
  }
}
