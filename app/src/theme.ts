import { createTheme, type ThemeOptions } from "@mui/material/styles";

const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    body1: { fontSize: "0.875rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#1a56db",
    },
    secondary: {
      main: "#7c3aed",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
  },
});

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#60a5fa",
    },
    secondary: {
      main: "#a78bfa",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },
});
