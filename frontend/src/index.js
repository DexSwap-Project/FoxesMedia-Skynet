import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { StoreProvider } from 'easy-peasy';
import App from "./App";
import store from "./store";
import 'semantic-ui-css/semantic.min.css'
import { SkynetProvider } from './state/SkynetContext';

render(
  <SkynetProvider>
  <Provider store={store}>
    <StoreProvider store={store}>
    <App />
    </StoreProvider>
  </Provider>
  </SkynetProvider>,
  document.getElementById("root")
);
