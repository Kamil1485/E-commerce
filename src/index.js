import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./pages/Redux/app/store";
import { Provider } from "react-redux";
import { app } from "./firebase";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} app={app}>
    <App />
  </Provider>
);
