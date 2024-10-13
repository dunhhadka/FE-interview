import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { Circle } from "@mui/icons-material";
import CustomAvatar from "./CustomeAvatar";
import NavBarListLineItem from "./NavBarListLineItem";
import CollapsibleTable from "./UserTable";
import DataTable from "./UserTable";
import PaginatedTable from "./UserTable";
import { useNavigate } from "react-router-dom";

const drawerWidth = 210;

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

       
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate('/login');
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <StyledNavBar>
            <StyledGroupMenuHome>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 0 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                Trang chủ
              </Typography>
            </StyledGroupMenuHome>
            <CustomAvatar />
          </StyledNavBar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <NavBarListLineItem handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
        <div style={{marginTop: 50, width: "100%"}}>
      <PaginatedTable />
        </div>
    </Box>
  );
};

export default Navbar;

const StyledNavBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledGroupMenuHome = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
