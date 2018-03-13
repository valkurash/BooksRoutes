import React, { Component } from "react";
import Root from "./containers/Root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store from "./store/configureStore";
import history from "./history";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme } from "material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Root />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
