import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from '../containers/App';
import reducers from '../reducers';

let store: Store<any> = createStore(
  reducers,
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
  module.hot.accept('../containers/App.ts', () => {
    render(app, target);
  });
}
