// theme/theme.jsx
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#911c8b" },
    secondary: { main: "#ff9800" },
  },
  customBackgrounds: {
    gradient: "linear-gradient(to right, #fce4ec, #e3f2fd)",
  },

  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ffb74d" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },

  customBackgrounds: {
    gradient: "linear-gradient(to right, #212121, #424242)",
  },
});
