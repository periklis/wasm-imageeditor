import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App/app.jsx';
import reducers from 'Reducers';

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <AppContainer><Provider store={store}><App/></Provider></AppContainer>,
  document.querySelector('#main')
);

if (module && module.hot) {
  module.hot.accept('./App/app.jsx', () => {
    const App = require('./App/app.jsx').default;
    render(
      <AppContainer>
        <Provider store={store}><App/></Provider>
      </AppContainer>,
      document.querySelector('#main')
    );
  });
}
