import React, { Component } from "react";
import Root from "./containers/Root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store from "./store/configureStore";
import history from "./history";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import ReactGA from "react-ga";

ReactGA.initialize("UA-116041442-1");

/*"primary1Color": "#009688",
"accent1Color": "#ff6e40",
"primary2Color": "#00796b",
"primary3Color": "#00695c",
"accent2Color": "#e0f2f1",
"pickerHeaderColor": "#4db6ac"*/

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
