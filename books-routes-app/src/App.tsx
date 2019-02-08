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
  jssPreset
} from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import ReactGA from 'react-ga';
import './index.css';

const store = configureStore();

const notSnap = navigator.userAgent !== 'ReactSnap';
const production = process.env.NODE_ENV === 'production';

if (production && notSnap) {
  ReactGA.initialize('UA-116041442-1');
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

      ((m, e, t, r, i, k, a) => {
        (m as any)[i] =
          (m as any)[i] ||
          // tslint:disable-next-line:only-arrow-functions
          function() {
            ((m as any)[i].a = (m as any)[i].a || []).push(arguments);
          };
        (m as any)[i].l = 1 * (new Date() as any);
        (k as any) = e.createElement(t);
        (a as any) = e.getElementsByTagName(t)[0];
        (k as any).async = 1;
        (k as any).src = r;
        (a as any).parentNode.insertBefore(k, a);
      })(
        window,
        document,
        'script',
        'https://mc.yandex.ru/metrika/tag.js',
        'ym'
      );

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

  render() {
    return (
      <JssProvider
        jss={create(jssPreset())}
        generateClassName={createGenerateClassName({
          dangerouslyUseGlobalCSS: true,
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
