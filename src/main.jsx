import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// stroe
import { store, persistor } from "./store/index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// 全局样式
import "./style/base.scss";
import "./style/App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
