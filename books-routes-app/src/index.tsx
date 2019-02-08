import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import { unregister } from "./registerServiceWorker";

const rootElement = document.getElementById('root');
if (rootElement && rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
const notSnap = navigator.userAgent !== 'ReactSnap';
const production = process.env.NODE_ENV === 'production';

if (production && notSnap) {
  registerServiceWorker();
  // unregister();
}
