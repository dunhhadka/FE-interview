import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import { User, createUser } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: User) => {
    try {
      const res = await dispatch(
        createUser({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        })
      );
      if(res.meta.requestStatus === "fulfilled") {
      navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <PageStyled>
      <Box
        sx={{
          width: 400,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon />
          <Typography sx={{ marginLeft: 1, fontWeight: 500, fontSize: 14 }}>
            Back
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
            padding: 4,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                position: "relative",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                padding: "32px",
                width: "444px",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                }}
              >
                <CloseIcon />
              </Box>

              <Typography variant="h5" fontWeight="bold" mb={2}>
                Register
              </Typography>
              <Typography variant="body2" mb={3}>
                Already have an account?{" "}
                <Link href="/login" underline="none">
                  Login
                </Link>
              </Typography>

              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                {...register("fullName", { required: "Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ""}
              />

              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />

              <TextField
                fullWidth
                label="Phone"
                type="text"
                variant="outlined"
                margin="normal"
                {...register("phone", { required: "Phone is required" })}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    {...register("termsAccepted", {
                      required: "You must accept the terms and conditions",
                    })}
                    color="info"
                  />
                }
                label={
                  <span>
                    I have read the{" "}
                    <span style={{ color: "#3f51b5" }}>
                      Terms and Conditions
                    </span>
                  </span>
                }
                sx={{ marginTop: 1, marginLeft: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#6C63FF",
                  mt: 2,
                  ":hover": {
                    backgroundColor: "#5b53e0",
                  },
                  borderRadius: 2,
                }}
                type="submit"
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  Register
                </Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </PageStyled>
  );
};

export default RegisterForm;

const PageStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
