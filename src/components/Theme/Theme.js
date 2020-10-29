import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import teal from "@material-ui/core/colors/teal";
import useLocalStorage from "../../hooks/useLocalStorage";

const themeLight = createMuiTheme({
  palette: {
    type: "light",
    primary: orange,
    secondary: teal,
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: orange,
    secondary: teal,
  },
});

const Theme = (props) => {
  const { children, darkMode } = props;
  const defaultTheme = darkMode ? themeDark : themeLight;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const withTheme = (Component) => {
  return (props) => {
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    );
  };
};
