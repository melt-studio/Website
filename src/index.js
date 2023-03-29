import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "./fonts/AlteHaasGroteskRegular.ttf";
import "./fonts/SpaceMono-Regular.ttf";
import "./fonts/HankenGrotesk-VariableFont_wght.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
reportWebVitals();
