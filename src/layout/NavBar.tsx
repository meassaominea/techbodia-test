import { AppBar, Toolbar } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: { xs: "background.default", md: "transparent" } }}
    >
      <Toolbar></Toolbar>
    </AppBar>
  );
}
