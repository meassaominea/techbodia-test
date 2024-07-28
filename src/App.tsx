import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "routes";
import theme from "theme";

function App() {
  return (
    <>
      <BrowserRouter basename="techbodia-test">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AllRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
