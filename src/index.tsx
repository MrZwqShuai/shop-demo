import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import { Provider } from "mobx-react";
import * as Store from "./Store/index";
import "./index.scss";
import "antd-mobile/dist/antd-mobile.css";
ReactDOM.render(
  <Provider {...Store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
