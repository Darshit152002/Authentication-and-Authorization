import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import "remixicon/fonts/remixicon.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
