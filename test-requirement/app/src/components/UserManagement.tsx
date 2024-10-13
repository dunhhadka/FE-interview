import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "./Table";
import UserTable from "./Table";
const UserManagement = () => {
  return (
    <Container
      sx={{
        position: "relative",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 600
        }}
      >
        User management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          marginTop: 2,
          borderRadius: "10px",
          boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
          <UserTable/>
      </Box>
    </Container>
  );
};

export default UserManagement;
