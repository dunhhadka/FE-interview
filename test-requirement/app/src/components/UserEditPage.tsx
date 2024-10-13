import React, { useCallback, useEffect, useId, useState } from "react";
import { Box, Typography, Tab, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { User } from "../redux/action";
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from "../api/api";
import Loading from "./Loading";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  onClose: () => void;
}

function UserEditPage({ onClose, userId }: Props) {
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const [upadateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserByIdMutation();

  const isLoading = isLoadingUser || isLoadingUpdateUser;

  const showStyle = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: { tension: 300, friction: 30 },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
      role: "member",
      type: "normal",
      national: "",
      status: "activated",
      language: "english",
    },
  });

  const onSubmit = useCallback(
    async (data: User) => {
      if (userId) {
        const res = await upadateUser({ id: userId, user: data });
        if (!res?.error && !!res?.data) {
          toast.success("User updated successfully.");
        } else {
          toast.error("Failed to update user. Please try again.");
        }
      }
    },
    [upadateUser, userId]
  );

  useEffect(() => {
    if (!isLoadingUser && user) {
      reset({
        password: user.password || "",
        email: user.email || "",
        fullName: user.fullName || "John Doe",
        phone: user.phone || "1234567890",
        role: user.role || "member",
        type: user.type || "normal",
        national: user.national || "",
        status: user.status || "deleted",
        language: user.language || "english",
      });
    }
  }, [isLoadingUser, reset, user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal open={true} onClose={onClose}>
      <animated.div style={showStyle}>
        <Box
          sx={{
            width: "680px",
            height: "100vh",
            bgcolor: "white",
            position: "absolute",
            right: 0,
            padding: "15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "rgba(17, 25, 39, 1)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {user?.fullName}
            </Typography>
            <div onClick={onClose} style={{ cursor: "pointer" }}>
              <CloseIcon sx={{ fontSize: 20, marginTop: "4px" }} />
            </div>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ marginTop: "50px" }}
          >
            <InfoRow>
              <LabelTypography>Email</LabelTypography>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    sx={{ width: 515 }}
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Password</LabelTypography>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    sx={{ width: 515 }}
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Full Name</LabelTypography>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName ? errors.fullName.message : ""}
                    sx={{ width: 515 }}
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Phone</LabelTypography>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                    sx={{ width: 515 }}
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Role</LabelTypography>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role ? errors.role.message : ""}
                    sx={{ width: 515 }}
                    disabled
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Account Type</LabelTypography>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Account Type is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.type}
                    helperText={errors.type ? errors.type.message : ""}
                    sx={{ width: 515 }}
                    disabled
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Nationality</LabelTypography>
              <Controller
                name="national"
                control={control}
                rules={{ required: "Nationality is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.national}
                    helperText={errors.national ? errors.national.message : ""}
                    sx={{ width: 515 }}
                    disabled
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Status</LabelTypography>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status ? errors.status.message : ""}
                    sx={{ width: 515 }}
                    disabled
                  />
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Language</LabelTypography>
              <Controller
                name="language"
                control={control}
                rules={{ required: "Language is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.language}
                    helperText={errors.language ? errors.language.message : ""}
                    sx={{ width: 515 }}
                    disabled
                  />
                )}
              />
            </InfoRow>

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
                }}
                type="submit"
              >
                Save Change
              </Button>
            </Box>
          </Box>
        </Box>
      </animated.div>
    </Modal>
  );
}

export default UserEditPage;

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
