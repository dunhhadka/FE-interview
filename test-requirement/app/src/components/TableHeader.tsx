import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import UserCreatePage from "./UserCreatePage";

const TableHeader = () => {
  const [showFormCreate, setShowFormCreate] = useState<boolean> (false);
  const closeFormCreate = () => {
    setShowFormCreate(false);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111927" }}>
        List of Users
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            borderRadius: 5,
            background: "#E0E0E0",
            marginRight: "8px",
            color: "#111927",
          }}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            borderRadius: 5,
            background: "#635BFF",
          }}
          onClick={() => setShowFormCreate(true)}
        >
          Add New Member
        </Button>
      </Box>
      {showFormCreate && <UserCreatePage onClose={closeFormCreate}/>}
    </Box>
  );
};

export default TableHeader;
