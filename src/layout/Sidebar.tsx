import React, { useState } from "react";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Stack,
  SxProps,
  IconButton,
  useTheme,
  Divider,
  Tooltip,
} from "@mui/material";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import useNavigationMenu from "hooks/useNavigationMenu";
import { ArrowLeft3, ArrowRight3 } from "iconsax-react";

const Sidebar = () => {
  // Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navigationList = useNavigationMenu();

  const [collapseDrawer, setCollapseDrawer] = useState(false);

  return (
    <>
      <Drawer
        variant={"permanent"}
        anchor="left"
        sx={!collapseDrawer ? drawerSx : drawerCollapeSx}
        PaperProps={{ className: "hide-scrollbar" }}
      >
        <IconButton
          onClick={() => setCollapseDrawer(!collapseDrawer)}
          sx={{
            position: "fixed",
            left: !collapseDrawer ? 284 : 74,
            top: !collapseDrawer ? 32 : 28,
            zIndex: 1300,
            height: 32,
            width: 32,
            borderWidth: 1,
            borderColor: theme.palette.text.secondary,
            borderStyle: "dashed",
            transition: "all 300ms ease-out",
            "&:hover": {
              background: theme.palette.common.white,
            },
            background: theme.palette.background.default,
          }}
        >
          {!collapseDrawer ? (
            <ArrowLeft3 size="24" color={theme.palette.text.primary} />
          ) : (
            <ArrowRight3 size="24" color={theme.palette.text.primary} />
          )}
        </IconButton>

        <Stack direction="row" alignItems="center">
          <Avatar
            variant="square"
            alt="logo-title"
            src={`/techbodia-test/logo.png`}
            sx={{
              width: !collapseDrawer ? 64 : 56,
              height: !collapseDrawer ? 64 : 56,
              my: 2,
            }}
          />
          {!collapseDrawer && (
            <Typography
              variant="h5"
              color="primary"
              fontWeight={600}
              ml={1.5}
              flexGrow={1}
            >
              TECHBODIA
            </Typography>
          )}
        </Stack>

        <List>
          {navigationList.map((nav) => {
            return (
              <React.Fragment key={nav.subTitle}>
                {nav.item.length > 0 && (
                  <ListSubheader sx={{ color: "text.primary" }}>
                    {!collapseDrawer ? nav.subTitle : <Divider />}
                  </ListSubheader>
                )}
                {nav.item.map(
                  (e) =>
                    e.show && (
                      <ListItemButton
                        key={e.toUrl}
                        selected={!!matchPath(e.toUrl, pathname)}
                        onClick={() => {
                          navigate(e.toUrl, { replace: true });
                        }}
                        sx={{
                          borderRadius: 4,
                          mb: 0.5,
                        }}
                      >
                        <Tooltip
                          title={!collapseDrawer ? "" : e.title}
                          placement="right"
                          arrow
                        >
                          <ListItem disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon
                              sx={{
                                color: !!matchPath(e.toUrl, pathname)
                                  ? "primary.main"
                                  : "text.secondary",
                              }}
                            >
                              {e.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={e.title}
                              sx={{
                                display: !collapseDrawer ? "initial" : "none",
                                "& .MuiListItemText-primary": {
                                  color: !!matchPath(e.toUrl, pathname)
                                    ? "primary.main"
                                    : "text.secondary",
                                  fontWeight: 450,
                                },
                              }}
                            />
                          </ListItem>
                        </Tooltip>
                      </ListItemButton>
                    )
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

// Styles
const drawerSx: SxProps = {
  width: { xs: "100vw", sm: "300px" },
  height: "100vh",
  position: "relative",
  transition: "all 300ms ease-out",
  "& .MuiDrawer-paper": {
    px: 2,
    pb: { xs: 15, sm: 0 },
    width: { xs: "100vw", sm: "300px" },
    borderRadius: 0,
    borderRightWidth: { xs: 0, sm: 0, md: 1 },
    borderRightColor: "text.secondary",
    borderRightStyle: "dashed",
    height: "100vh",
    bgcolor: "background.paper",
    transition: "all 300ms ease-out",
  },
};
const drawerCollapeSx: SxProps = {
  width: { xs: "100vw", sm: "88px" },
  height: "100vh",
  position: "relative",
  transition: "all 300ms ease-out",
  "& .MuiDrawer-paper": {
    px: 2,
    width: { xs: "100vw", sm: "88px" },
    borderRadius: 0,
    borderRightWidth: 1,
    borderRightColor: "text.secondary",
    borderRightStyle: "dashed",
    height: "100vh",
    bgcolor: "background.paper",
    transition: "all 300ms ease-out",
  },
};

export default Sidebar;
