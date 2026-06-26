import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const items = isAuthenticated
    ? [
        {
          label: "Dashboard",
          to: user?.role === "admin" ? "/admin" : "/customer",
        },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Sign In", to: "/login" },
        { label: "Sign Up", to: "/register" },
      ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: "linear-gradient(to right, #4a148c, #880e4f)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "white",
            }}>
            Delivery System
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {items.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                sx={{ color: "white", fontWeight: 500 }}>
                {item.label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button onClick={handleLogout} sx={{ color: "white" }}>
                Logout
              </Button>
            )}
          </Box>

          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "white" }}
            onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Stack spacing={1}>
            {items.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                onClick={() => setOpen(false)}
                sx={{ justifyContent: "flex-start" }}>
                {item.label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                sx={{ justifyContent: "flex-start" }}>
                Logout
              </Button>
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
