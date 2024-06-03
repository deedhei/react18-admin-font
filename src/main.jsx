import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// stroe
import store from "./store/index.js";
import { Provider } from "react-redux";

// 全局样式
import "./style/base.scss";
import "./style/App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
