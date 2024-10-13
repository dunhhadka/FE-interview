import React, { useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { User } from "../redux/action";
import { getRole, getStatus } from "./Table";
import { useActiveUserByIdMutation } from "../api/api";
import Loading from "./Loading";

const StyledBox = styled.div`
  background-color: #f9fafb;
  width: 480px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(225, 225, 225, 0.8);
`;

const LabelTypography = styled(Typography)`
  color: rgba(108, 115, 127, 1);
  font-size: 14px;
  font-weight: 500;
`;

const InfoRow = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const AvatarBox = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
`;

interface Props {
  user: User;
}

function InfoDetail({ user }: Props) {
  const [activeUser, { isLoading }] = useActiveUserByIdMutation();

  const activeUserById = useCallback(async () => {
    if (user.id) {
      await activeUser(user.id);
    }
  }, [activeUser, user.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      {user.status === "waiting" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              fontSize: 14,
              borderRadius: 5,
              background: "#635BFF",
              marginTop: "10px",
              marginBottom: "20px",
            }}
            onClick={activeUserById}
          >
            Active User
          </Button>
        </Box>
      )}
      <InfoRow>
        <LabelTypography>User ID</LabelTypography>
        <StyledBox>
          <Typography>{user.id}</Typography>
        </StyledBox>
      </InfoRow>

      {/* <InfoRow>
        <LabelTypography>Avatar</LabelTypography>
        <Box sx={{width: 515}}>
          <AvatarBox>
            <img
              src="https://via.placeholder.com/80"
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover"}}
            />
          </AvatarBox>
        </Box>
      </InfoRow> */}

      <InfoRow>
        <LabelTypography>Email</LabelTypography>
        <StyledBox>
          <Typography>{user.email}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Full Name</LabelTypography>
        <StyledBox>
          <Typography>{user.fullName}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Phone</LabelTypography>
        <StyledBox>
          <Typography>{user.phone}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Role</LabelTypography>
        <StyledBox>
          <Typography>{getRole(user)}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Acount Type</LabelTypography>
        <StyledBox>
          <Typography>{user.type}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Nationality</LabelTypography>
        <StyledBox>
          <Typography>{user.national}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Status</LabelTypography>
        <StyledBox>
          <Typography>{getStatus(user)}</Typography>
        </StyledBox>
      </InfoRow>

      <InfoRow>
        <LabelTypography>Language</LabelTypography>
        <StyledBox>
          <Typography>{user.language}</Typography>
        </StyledBox>
      </InfoRow>
    </Box>
  );
}

export default InfoDetail;
