import { createMuiTheme } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    primary: undefined,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});
