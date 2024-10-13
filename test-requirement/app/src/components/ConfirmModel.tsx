import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface Props {
     open : boolean,
     onClose: () => void;
     onConfirm : () => void;
}

const ConfirmModal = ({ open, onClose, onConfirm } : Props)  => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to change status this item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} color="primary" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} color="secondary">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
