import React, { Component } from "react";
import Root from "./containers/Root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store from "./store/configureStore";
import history from "./history";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <Root />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
