import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const { Polyline } = require("react-google-maps");

export default class PathWithInfo extends PureComponent {
  static propTypes = {
    pointData: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isHovered: PropTypes.bool.isRequired,
    onToggleOpen: PropTypes.func.isRequired,
    onToggleHover: PropTypes.func.isRequired,
    zoomToBound: PropTypes.func.isRequired
  };

  render() {
    const {
      pointData,
      isOpen,
      isHovered,
      onToggleOpen,
      onToggleHover,
      zoomToBound
    } = this.props;
    return (
      <div key={pointData.order}>
        <Polyline
          path={pointData.polyline}
          options={{
            geodesic: true,
            strokeColor: pointData.strokeColor,
            strokeWeight: isOpen || isHovered ? 12 : 7
          }}
          onClick={() => {
            onToggleOpen(pointData.id, true);
            zoomToBound(pointData.polyline, false);
          }}
          onMouseOver={() => onToggleHover(pointData.id, true)}
          onMouseOut={() => onToggleHover(pointData.id, false)}
        />
        <Snackbar
          open={isOpen}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
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
                right: "-10px",
                top: "-10px"
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
