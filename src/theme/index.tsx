import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Siemreap",
      "Moul",
      "Khmer Busra high",
      "-apple-system",
      "Raleway",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#FF1684",
      light: "#FF6EB2",
      dark: "#870C46",
    },
    // secondary: {
    //   main: "#2665D1",
    //   light: "#6992FF",
    //   dark: "#003C9F",
    // },
    error: {
      main: "#F0142F",
      light: "#FF5C59",
      dark: "#B50007",
    },
    success: {
      main: "#33AB55",
      light: "#6BDE83",
      dark: "#007B29",
    },
    warning: {
      main: "#F8A92D",
      light: "#FFDB60",
      dark: "#C07A00",
    },
    info: {
      main: "#338DEE",
      light: "#76BDFF",
      dark: "#0060BB",
    },
    text: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#9FA8B1",
    },
    background: {
      default: "#F9FAFB",
      paper: "#F9FAFB",
    },
    divider: "#E0E0E0",
  },
});

theme.components = {
  MuiTextField: {
    defaultProps: {
      size: "medium",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "contained",
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
      },
    },
  },
};

export default theme;
