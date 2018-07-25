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
import { create, SheetsRegistry } from "jss";
import ReactGA from "react-ga";
import "./index.css";

const notSnap = navigator.userAgent !== "ReactSnap";
const production = process.env.NODE_ENV === "production";

if (production && notSnap) {
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
const createGenerateClassName1 = () => {
  const maxRules = 1e10;
  const env = process.env.NODE_ENV;
  let ruleCounter = 0;
  const defaultPrefix = env === "production" ? "c" : "";

  return (rule, sheet) => {
    ruleCounter += 1;

    if (ruleCounter > maxRules) {
      console.log(
        `[JSS] You might have a memory leak. Rule counter is at ${ruleCounter}.`
      );
    }

    let prefix = defaultPrefix;
    let jssId = "";

    if (sheet) {
      prefix =
        sheet.options.classNamePrefix || sheet.options.meta || defaultPrefix;
      if (sheet.options.jss.id != null) jssId += sheet.options.jss.id;
    }

    if (env === "production") {
      return `${prefix}${jssId}${ruleCounter}`;
    }

    return `${prefix + rule.key}-${jssId && `-${jssId}`}-${ruleCounter}`;
  };
};

export default class App extends Component {
  render() {
    return (
      <JssProvider
        jss={create(jssPreset())}
        generateClassName={createGenerateClassName({
          dangerouslyUseGlobalCSS: true
        })}
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
