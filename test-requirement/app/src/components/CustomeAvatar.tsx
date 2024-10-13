import Avatar from "@mui/material/Avatar"; // Nhập thành phần Avatar
import styled from "@emotion/styled";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/action";
import { useNavigate } from 'react-router-dom';

const CustomAvatar = styled(Avatar)({
  width: "35px",
  height: "35px",
  fontSize: "20px",
  borderRadius: "50%",
});

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    console.log("logout");
    const id = localStorage.getItem("current_user_id");
    if(id) {
        const result = await dispatch(logout(id));
        if(result.meta.requestStatus === 'fulfilled') {
          navigate("/login");
        }
    }
    handleClose(); 
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <CustomAvatar
        alt="User Profile"
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)} 
        onClose={handleClose} 
      >
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
