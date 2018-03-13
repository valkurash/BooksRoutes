//decorator === HOC === Higher Order Component
import React from "react";

export default OriginalComponent =>
  class DrawerToggleDecorator extends React.Component {
    state = {
      mobileOpen: false
    };

    handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          drawerToggle={this.handleDrawerToggle}
        />
      );
    }
  };
