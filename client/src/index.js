import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
// ======================================================
import store from "./redux/store";
import "./index.css";
import App from "./components/App";
// ======================================================

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
