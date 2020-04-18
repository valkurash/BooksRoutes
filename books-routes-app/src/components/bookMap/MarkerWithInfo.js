import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const { Marker } = require("react-google-maps");

export default class MarkerWithInfo extends PureComponent {
  static propTypes = {
    pointData: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    isHovered: PropTypes.bool,
    onToggleOpen: PropTypes.func.isRequired,
    onToggleHover: PropTypes.func.isRequired,
    panToMarker: PropTypes.func.isRequired
  };

  render() {
    const {
      pointData,
      isOpen = false,
      isHovered = false,
      onToggleOpen,
      onToggleHover,
      panToMarker
    } = this.props;
    return (
      <div>
        <Marker
          class="point-marker"
          animation={isOpen ? window.google.maps.Animation.BOUNCE : null}
          title={pointData.name}
          icon={{
            path: "M 0 0 L -10 -20 A 10 10, 0, 1, 1, 10 -20 z",
            fillColor: isHovered || isOpen ? "#009688" : "#ff6e40",
            fillOpacity: 1,
            strokeColor: "#000",
            strokeWeight: 1
          }}
          position={pointData.point}
          onClick={() => {
            onToggleOpen(pointData.id, true);
            panToMarker(pointData.point);
          }}
          onMouseOver={() => onToggleHover(pointData.id, true)}
          onMouseOut={() => onToggleHover(pointData.id, false)}
        />
        <Snackbar
          open={isOpen}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": `message-${pointData.order}`,
            style: { paddingTop: "16px" }
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={
            <div
              style={{
                maxHeight: "calc(50vh - 108px)",
                overflowY: "auto",
                overflowX: "hidden",
                minHeight: "40px",
                wordBreak: "break-all"
              }}
            >
              <div className="point-header" style={{ fontWeight: "bold" }}>
                {pointData.name}
              </div>
              <div className="point-descr">
                {(pointData.description || "").split("\n").map((item, key) => {
                  return (
                    <div key={key}>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  );
                })}
              </div>
            </div>
          }
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              size="small"
              style={{
                position: "absolute",
                right: 0,
                top: 0
              }}
              onClick={() => onToggleOpen(pointData.id, false)}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    );
  }
}
