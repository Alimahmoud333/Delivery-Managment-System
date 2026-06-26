// layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/navigation/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
