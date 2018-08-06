import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//const { Polygon } = require("react-google-maps");
import PolygonDataLayer from "../PolygonDataLayer";

export default class PolygonWithInfo extends PureComponent {
  static propTypes = {
    polygonsData: PropTypes.array.isRequired,
    isOpenObj: PropTypes.object.isRequired,
    isHoveredObj: PropTypes.object.isRequired,
    onToggleOpen: PropTypes.func.isRequired,
    onToggleHover: PropTypes.func.isRequired,
    zoomToBound: PropTypes.func.isRequired,
    map: PropTypes.object
  };

  render() {
    const {
      polygonsData,
      isOpenObj,
      isHoveredObj,
      onToggleOpen,
      onToggleHover,
      zoomToBound,
      map
    } = this.props;
    return (
      <div>
        <PolygonDataLayer
          polygonsData={polygonsData}
          map={map}
          isOpenObj={isOpenObj}
          isHoveredObj={isHoveredObj}
          onToggleOpen={onToggleOpen}
          onToggleHover={onToggleHover}
          zoomToBound={zoomToBound}
        />
        {polygonsData.map(pointData => (
          <Snackbar
            key={pointData.order}
            open={isOpenObj[pointData.id.toString()]}
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
                  {(pointData.description || "")
                    .split("\n")
                    .map((item, key) => {
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
        ))}
      </div>
    );
  }
}
