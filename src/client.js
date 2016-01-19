import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import createStore from './shared/create';
import { render as renderDevtools } from './client/devtools';

// dependencies of external source. these resolve via webpack aliases
// as assigned in merge-configs.js
import getRoutes from 'routes';
import middleware from 'middleware';

const dest = document.getElementById('content');
const browserHistory = createHistory();

const store = createStore(middleware, window.__data);

syncReduxAndRouter(browserHistory, store, (state) => state.get('routing'));

const component = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

renderDevtools(component, store, dest);
