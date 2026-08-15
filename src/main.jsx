import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#111827",
        color: "#22c55e",
        border: "1px solid #22c55e",
      },
    }}
  />
    </ThemeProvider>
  </React.StrictMode>
);