import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <Box component={Paper} display="flex">
      <Sidebar />
      <Paper component="main" sx={{ flexGrow: 1 }}>
        <NavBar />
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AppLayout;
