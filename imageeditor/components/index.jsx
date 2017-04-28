import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from 'Containers/App';
import reducers from 'Reducers';

let store = createStore(
  reducers, /* preloadedState, */
  composeWithDevTools()
);

const target = document.querySelector('#webAssemblyImageEditor');

const app = (
  <AppContainer>
    <Provider store={store}>
      <App/>
    </Provider>
  </AppContainer>
);

render(app, target);

if (module && module.hot) {
  module.hot.accept('../containers/App.js', () => {
    render(app, target);
  });
}
