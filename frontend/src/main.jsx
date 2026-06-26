import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { lightTheme } from "./theme/theme"; // <-- use lightTheme
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { ModalProvider } from "./context/ModalContext";
import CustomerProvider from "./context/customerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <SnackbarProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SnackbarProvider>
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
);
