import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  AdjustableLayerContext,
  AdjustableLayerContextProvider,
} from "./components/context/AdjustableLayerContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdjustableLayerContextProvider>
      <App />
    </AdjustableLayerContextProvider>
  </React.StrictMode>
);
