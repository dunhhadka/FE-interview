import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../images/Logo";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";

const NavBar = styled(Box)({
  width: 240,
  backgroundColor: "#121621",
  height: "100vh",
  position: "fixed",
});

const Content = styled(Box)({
  marginLeft: 250,
  padding: 20,
  flexGrow: 1,
});

const UserManagement = React.lazy(() => import("./UserManagement"));

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "user-management">(
    "overview"
  );

  const handleTabClick = (tab: "overview" | "user-management") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === "overview") {
      navigate("/home");
    } else if (activeTab === "user-management") {
      navigate("/home/user-management");
    }
  }, [activeTab, navigate]);

  return (
    <Box display="flex" sx={{ background: "#F3F4F6" }}>
      <Box sx = {{zIndex: 100}}>
        <NavBar>
          <AppBar position="static" sx={{ background: "#121621" }}>
            <Toolbar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: 2, width: 32, height: 32 }}>
                  <Logo />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                    STARACK
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    Test interview
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <List sx={{ marginTop: "20px" }}>
            <ListItemButton
              onClick={() => handleTabClick("overview")}
              sx={{
                margin: "6px",
                backgroundColor:
                  activeTab === "overview" ? "#635BFF" : "transparent",
                borderRadius: 5,
                color: "white",
                "&:hover": {
                  backgroundColor:
                    activeTab === "overview" ? "#635BFF" : "transparent",
                },
              }}
            >
              <HomeRoundedIcon sx={{ marginRight: 1, fontSize: 22 }} />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Overview
              </Typography>
            </ListItemButton>
            <ListItemButton
              onClick={() => handleTabClick("user-management")}
              sx={{
                margin: "6px",
                backgroundColor:
                  activeTab === "user-management" ? "#635BFF" : "transparent",
                borderRadius: 5,
                color: "white",
                "&:hover": {
                  backgroundColor:
                    activeTab === "user-management" ? "#635BFF" : "transparent",
                },
              }}
            >
              <PeopleTwoToneIcon sx={{ marginRight: 1, fontSize: 22 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                User Management
              </Typography>
            </ListItemButton>
          </List>
        </NavBar>
      </Box>
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === "user-management" ? (
            <UserManagement />
          ) : (
            "user-management-page"
          )}
        </Suspense>
      </Content>
    </Box>
  );
};

export default HomePage;
