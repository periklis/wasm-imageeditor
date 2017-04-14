import 'normalize.css/normalize.css';
import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App/app.jsx';

render(
  <AppContainer><App/></AppContainer>,
  document.querySelector('#main')
);

if (module && module.hot) {
  module.hot.accept('./App/app.jsx', () => {
    const App = require('./App/app.jsx').default;
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector('#main')
    );
  });
}
