import React from "react";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 280;

/* ================= MENU ================= */

const navItems = [
  { label: "Dashboard", to: "/driver" },
  { label: "My Deliveries", to: "/driver/deliveries" },
  // { label: "Profile", to: "/driver/profile" },
  { label: "Messages", to: "/driver/messages" },

];

/* ================= LAYOUT ================= */

export default function DriverLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

const token = localStorage.getItem("token");

  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user } = useAuth();


  useEffect(() => {
  fetchNotificationCount();

  const interval = setInterval(fetchNotificationCount, 10000);

  return () => clearInterval(interval);
}, []);

const fetchNotificationCount = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const list = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    const unread = list.filter((n) => !n.read_at);

    setNotificationCount(unread.length);
  } catch (err) {
    console.error(err);
  }
};

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  /* ================= SIDEBAR ================= */

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: "#fff",
      }}>
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
        <Avatar
          sx={{
            bgcolor: "#22c55e",
            width: 50,
            height: 50,
          }}>
          <LocalShippingIcon />
        </Avatar>

        <Box>
          <Typography fontWeight={800} fontSize="1.1rem">
            Driver Panel
          </Typography>

          <Typography variant="body2" color="#cbd5e1">
            Delivery System
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      {/* USER */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography fontWeight={700}>
          {user?.name || "Driver"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
            textTransform: "capitalize",
          }}>
          {user?.role}
        </Typography>
      </Box>

      {/* MENU */}
      <List sx={{ px: 2 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 3,
              mb: 1,
              py: 1.2,
              color: "#e2e8f0",
              transition: "0.3s",

              "&.Mui-selected": {
                bgcolor: "#22c55e",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(34,197,94,0.35)",
              },

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 700,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* LOGOUT */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            py: 1.2,
            color: "#fecaca",

            "&:hover": {
              bgcolor: "#dc2626",
              color: "#fff",
            },
          }}>
          <LogoutIcon sx={{ mr: 1 }} />

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 700,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}>
      {/* ================= TOPBAR ================= */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },

          background: "rgba(255,255,255,0.85)",

          backdropFilter: "blur(14px)",

          borderBottom: "1px solid #e2e8f0",

          color: "#111827",
        }}>
        <Toolbar sx={{ minHeight: "72px !important" }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{
              mr: 2,
              display: { md: "none" },
            }}>
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography fontWeight={800} fontSize="1.2rem">
              Driver Dashboard
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Manage deliveries and profile
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              component={Link}
              to="/driver/notifications">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              ml: 2,
              bgcolor: "#22c55e",
              fontWeight: "bold",
            }}>
            {user?.name?.charAt(0)?.toUpperCase() || "D"}
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}>
        {/* MOBILE */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
            },
          }}>
          {drawerContent}
        </Drawer>

        {/* DESKTOP */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxSizing: "border-box",
            },
          }}>
          {drawerContent}
        </Drawer>
      </Box>

      {/* ================= CONTENT ================= */}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ minHeight: "72px !important" }} />

        <Container
          maxWidth="xl"
          sx={{
            py: 4,
          }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}