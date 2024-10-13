import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/action";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

interface LoginRequest {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <PageStyled>
      <Box
        sx={{
          width: 400,
          height: 418,
          backgroundColor: "white",
          position: "relative",
          bottom: 50,
          right: 50,
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
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <ArrowBackIcon />
          </Box>
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
            background: "linear-gradient(to right, #f0f4ff, #f9fcff)",
            height: 300,
            position: "absolute",
            bottom: 0,
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
                Log in
              </Typography>
              <Typography variant="body2" mb={3}>
                Don’t have an account?{" "}
                <Link href="/register" underline="none">
                  Register
                </Link>
              </Typography>
              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                margin="normal"
                defaultValue="your@email.com"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={
                  errors.email ? (errors.email.message as string) : ""
                }
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={
                  errors.password ? (errors.password.message as string) : ""
                }
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
                }}
                type="submit"
              >
                Log in
              </Button>
              <Link
                href="#"
                underline="none"
                display="block"
                textAlign="center"
                mt={2}
              >
                Forgot password?
              </Link>
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
