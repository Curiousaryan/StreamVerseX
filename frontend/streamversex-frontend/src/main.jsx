import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import theme from "./theme/theme";

import { AuthProvider } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import { Toaster } from "react-hot-toast";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AuthProvider>
          <WatchlistProvider>
             <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,

        style: {
          background: "#111111",
          color: "#ffffff",
          border: "1px solid #27272a",
          borderRadius: "14px",
        },

        success: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
            <App />
          </WatchlistProvider>
        </AuthProvider>
      </BrowserRouter>

    </ThemeProvider>
  </React.StrictMode>
);