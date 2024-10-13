import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Tab,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { getLanguage, getRole, getStatus, getType } from "./Table";
import { User } from "../redux/action";
import { useCreateUserMutation } from "../api/api";
import Loading from "./Loading";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}
function UserCreatePage({ onClose }: Props) {
  const [createUser, { isLoading: isLoadingCreateUser }] =
    useCreateUserMutation();
  const showStyle = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: { tension: 300, friction: 30 },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      role: "member",
      firstName: "",
      lastName: "",
      national: "",
      status: "waiting",
      language: "viet_nam",
      type: "normal",
    },
  });
  const onSubmit = useCallback(
    async (data: User) => {
      const res = await createUser(data);
      if (!res?.error && !!res.data) {
        toast.success("User created successfully");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    },
    [createUser]
  );

  if (isLoadingCreateUser) {
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
            ></Typography>
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
                rules={{
                  required: "Password is required",
                }}
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
                defaultValue="member"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role ? errors.role.message : ""}
                    sx={{ width: 515 }}
                  >
                    <MenuItem value="super_admin">
                      {getRole({ role: "super_admin" })}
                    </MenuItem>
                    <MenuItem value="trainer">
                      {getRole({ role: "trainer" })}
                    </MenuItem>
                    <MenuItem value="member">
                      {getRole({ role: "member" })}
                    </MenuItem>
                  </TextField>
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Account Type</LabelTypography>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Account Type is required" }}
                defaultValue="normal"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                    error={!!errors.type}
                    helperText={errors.type ? errors.type.message : ""}
                    sx={{ width: 515 }}
                  >
                    <MenuItem value="normal">
                      {getType({ type: "normal" })}
                    </MenuItem>
                    <MenuItem value="premium">
                      {getType({ type: "premium" })}
                    </MenuItem>
                  </TextField>
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Nationality</LabelTypography>
              <Controller
                name="national"
                control={control}
                rules={{ required: "Nationality is required" }}
                defaultValue="viet_nam"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                    error={!!errors.national}
                    helperText={errors.national ? errors.national.message : ""}
                    sx={{ width: 515 }}
                  >
                    <MenuItem value="normal">viet_nam</MenuItem>
                    <MenuItem value="premium">english</MenuItem>
                  </TextField>
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Status</LabelTypography>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                defaultValue="waiting"
                disabled
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    select
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status ? errors.status.message : ""}
                    sx={{ width: 515 }}
                  >
                    <MenuItem value="waiting">
                      {getStatus({ status: "waiting" })}
                    </MenuItem>
                  </TextField>
                )}
              />
            </InfoRow>

            <InfoRow>
              <LabelTypography>Language</LabelTypography>
              <Controller
                name="language"
                control={control}
                rules={{ required: "Language is required" }}
                defaultValue="viet_nam"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                    error={!!errors.language}
                    helperText={errors.language ? errors.language.message : ""}
                    sx={{ width: 515 }}
                  >
                    <MenuItem value="viet_nam">
                      {getLanguage({ language: "viet_nam" })}
                    </MenuItem>
                    <MenuItem value="english">
                      {getLanguage({ language: "english" })}
                    </MenuItem>
                  </TextField>
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
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </animated.div>
    </Modal>
  );
}

export default UserCreatePage;

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
