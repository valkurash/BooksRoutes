import React, { Component } from 'react';
import Root from './containers/Root';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './redux';
import history from './history';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  StylesProvider,
  jssPreset
} from '@material-ui/core/styles';
import { create } from 'jss';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import './index.css';

const store = configureStore();

const notSnap = navigator.userAgent !== 'ReactSnap';
const production = process.env.NODE_ENV === 'production';

console.log('env: ', process.env);

if (production && notSnap) {
  // TODO: remove debug
  ReactGA.initialize('UA-116041442-1',{debug: true});
  ReactGA.ga((tracker:any) => {
    ReactGA.set({ dimension1: tracker.get('clientId') });
  });

  ReactPixel.init('532439894178602', undefined, { debug: true, autoConfig: true });
  ReactPixel.pageView();
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ff6e40',
      contrastText: '#fff',
    },
  },
});

export default class App extends Component {
  componentDidMount() {
    if (production && notSnap) {
      (window as any).fbAsyncInit = () => {
        (window as any).FB.init({
          appId: '439495829866949',
          xfbml: true,
          version: 'v3.1',
        });
        (window as any).FB.AppEvents.logPageView();
      };

      ((d, s, id) => {
        let js: any;
        const fjs: any = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');

      if ((window as any).ym && (window as any).ym instanceof Function) {
        (window as any).ym(52291750, 'init', {
          id: 52291750,
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        });
      }
    }
  }

  render() {
    return (
      <StylesProvider
        jss={create(jssPreset())}
        generateClassName={createGenerateClassName({
          disableGlobal: true,
        })}
      >
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <Root />
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </StylesProvider>
    );
  }
}
