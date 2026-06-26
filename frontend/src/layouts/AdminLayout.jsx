import React from "react";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard,
  People,
  LocalShipping,
  ShoppingCart,
  Star,
  Chat,
  Logout,
} from "@mui/icons-material";

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 280;

/* ================= MENU ================= */

const navItems = [
  { label: "Dashboard", to: "/admin", icon: <Dashboard /> },
  { label: "Users", to: "/admin/users", icon: <People /> },
  { label: "Drivers", to: "/admin/drivers", icon: <LocalShipping /> },
  { label: "Orders", to: "/admin/orders", icon: <ShoppingCart /> },
  { label: "Ratings", to: "/admin/ratings", icon: <Star /> },
  { label: "Messages", to: "/admin/messages", icon: <Chat /> },
];

/* ================= LAYOUT ================= */

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  /* ================= SIDEBAR ================= */

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        background:
          "linear-gradient(180deg, #020617 0%, #0f172a 50%, #111827 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* HEADER */}
      <Box sx={{ px: 3, py: 4, display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "#22c55e", fontWeight: "bold" }}>
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </Avatar>

        <Box>
          <Typography fontWeight={800}>Admin Panel</Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            {user?.name || "Admin"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      {/* MENU */}
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.3,
                background: active
                  ? "linear-gradient(to right, #22c55e, #16a34a)"
                  : "transparent",
                "&:hover": {
                  background: active
                    ? "linear-gradient(to right, #22c55e, #16a34a)"
                    : "rgba(255,255,255,0.06)",
                },
              }}>
              <ListItemIcon sx={{ color: "#fff", minWidth: 42 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}

        {/* LOGOUT */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mt: 3,
            borderRadius: 3,
            py: 1.3,
            "&:hover": {
              background: "rgba(239,68,68,0.18)",
            },
          }}>
          <ListItemIcon sx={{ color: "#ef4444", minWidth: 42 }}>
            <Logout />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
      </List>
    </Box>
  );

  /* ================= UI ================= */

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0f172a",
      }}>
      {/* ================= BACKGROUND IMAGE ================= */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(2,6,23,0.85), rgba(15,23,42,0.88)),
            url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* ================= CONTENT WRAPPER ================= */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
        }}>
        {/* ================= TOPBAR ================= */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
          }}>
          <Toolbar>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: "none" },
                bgcolor: "rgba(255,255,255,0.12)",
                color: "#fff",
              }}>
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight={800}>Admin Dashboard</Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}>
                Manage system, users & analytics
              </Typography>
            </Box>

            <Tooltip title={user?.name || "Admin"}>
              <Avatar sx={{ bgcolor: "#22c55e" }}>
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* ================= SIDEBAR ================= */}
        <Box component="nav" sx={{ width: { md: drawerWidth } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                border: "none",
                background: "transparent",
              },
            }}>
            {drawerContent}
          </Drawer>

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                border: "none",
                background: "transparent",
              },
            }}>
            {drawerContent}
          </Drawer>
        </Box>

        {/* ================= MAIN CONTENT ================= */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
          }}>
          <Toolbar sx={{ minHeight: "75px !important" }} />

          <Container
            maxWidth="xl"
            sx={{
              py: 4,
              position: "relative",
              zIndex: 5,
            }}>
            {/* ALL PAGES WILL BE ABOVE BACKGROUND */}
            <Box sx={{ position: "relative", zIndex: 5 }}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
