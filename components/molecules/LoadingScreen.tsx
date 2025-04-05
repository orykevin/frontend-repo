import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }} color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
