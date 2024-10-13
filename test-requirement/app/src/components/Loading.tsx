import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "@emotion/styled";

const LoadingWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: rgba(255, 255, 255, 0.8); 
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  );
};

export default Loading;
