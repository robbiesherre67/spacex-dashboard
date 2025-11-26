// Purpose:
// - Render React app
// - Attach Redux Provider

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/globals.css";   // IMPORTANT for theme variables

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
