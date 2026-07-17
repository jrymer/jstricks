import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { queryClient } from "../queryClient";
import { lightTheme, darkTheme } from "../theme";

interface RouterContext {
  queryClient: QueryClient;
}

interface ColorModeContextType {
  toggle: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggle: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

const RootLayout = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({ toggle: () => setMode((m) => (m === "light" ? "dark" : "light")), mode }),
    [mode]
  );

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div className="p-2 flex gap-2 items-center">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/assets" className="[&.active]:font-bold">
              Assets
            </Link>
            <button onClick={colorMode.toggle} className="ml-auto text-sm">
              {mode === "light" ? "Dark" : "Light"} mode
            </button>
          </div>
          <hr />
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
