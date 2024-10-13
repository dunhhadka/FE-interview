import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";

interface props {
  handleDrawerToggle: () => void
}

const NavBarListLineItem = ({handleDrawerToggle}: props) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const navigateToAllUserPage = () => {
    handleDrawerToggle();
    navigate("/home/users")
  }


  return (
    <StyledListItem>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" , top: 70}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Người dùng" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 3 }} onClick={navigateToAllUserPage}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Tất cả" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </StyledListItem>
  );
};

export default NavBarListLineItem;

const StyledListItem = styled.div`
     margin-top: 20;
`;
