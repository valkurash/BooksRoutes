import React, { Component } from "react";
import Root from "./containers/Root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store from "./store/configureStore";
import history from "./history";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import ReactGA from "react-ga";
import "./index.css";

const snap = navigator.userAgent !== "ReactSnap";
const production = process.env.NODE_ENV === "production";

if (production && snap) {
  ReactGA.initialize("UA-116041442-1");
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688"
    },
    secondary: {
      main: "#ff6e40",
      contrastText: "#fff"
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <JssProvider
        jss={create(jssPreset())}
        generateClassName={createGenerateClassName()}
      >
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <Root />
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </JssProvider>
    );
  }
}
