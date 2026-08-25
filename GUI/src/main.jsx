import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import NewDashboard from "./NewDashboard.jsx";

import "./styles/global.css";
import { LoaderProvider } from "./context/LoaderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoaderProvider>
      <BrowserRouter>
        <Routes>
          {/* Existing dashboard */}
          <Route path="/" element={<App />} />

          {/* New dashboard */}
          <Route path="/new-dashboard" element={<NewDashboard />} />
        </Routes>
      </BrowserRouter>
    </LoaderProvider>
  </React.StrictMode>,
);