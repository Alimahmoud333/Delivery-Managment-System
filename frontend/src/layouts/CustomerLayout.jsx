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
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard,
  LocationOn,
  ShoppingCart,
  AddBox,
  Map,
  Chat,
  Logout,
  Notifications,
} from "@mui/icons-material";

import { Badge } from "@mui/material";
import API from "../api/axios";

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 280;

/* ================= MENU ================= */


/* ================= LAYOUT ================= */

export default function CustomerLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [notificationCount, setNotificationCount] = React.useState(0);


const navItems = [
  {
    label: "Dashboard",
    to: "/customer",
    icon: <Dashboard />,
  },

  {
    label: "Addresses",
    to: "/customer/addresses",
    icon: <LocationOn />,
  },

  {
    label: "Orders",
    to: "/customer/orders",
    icon: <ShoppingCart />,
  },

  {
    label: "Create Order",
    to: "/customer/create-order",
    icon: <AddBox />,
  },

  // {
  //   label: "Payments",
  //   to: "/customer/payment",
  //   icon: <Payment />,
  // },

  {
    label: "Address Map",
    to: "/customer/address-map",
    icon: <Map />,
  },

  {
    label: "Messages",
    to: "/customer/messages",
    icon: <Chat />,
  },
  {
    label: "Notifications",
    to: "/customer/notifications",
    icon: (
      <Badge badgeContent={notificationCount} color="error">
        <Notifications />
      </Badge>
    ),
  },
];

  
  React.useEffect(() => {
  fetchNotificationCount();

  const interval = setInterval(fetchNotificationCount, 10000);

  return () => clearInterval(interval);
}, []);

const fetchNotificationCount = async () => {
  try {
    const res = await API.get("/notifications");

    const notifications = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    const unread = notifications.filter((n) => !n.read_at).length;

    setNotificationCount(unread);
  } catch (err) {
    console.log(err);
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
        background:
          "linear-gradient(180deg, #020617 0%, #0f172a 45%, #111827 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* HEADER */}

      <Box
        sx={{
          px: 3,
          py: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "#22c55e",
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0 8px 20px rgba(34,197,94,0.35)",
          }}>
          {user?.name?.charAt(0)?.toUpperCase() || "C"}
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight={800}>
            Delivery System
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8",
            }}>
            {user?.name || "Customer"}
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      {/* MENU */}

      <List
        sx={{
          px: 2,
          py: 3,
          flex: 1,
        }}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={active}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.3,
                transition: "0.25s",

                background: active
                  ? "linear-gradient(to right, #22c55e, #16a34a)"
                  : "transparent",

                boxShadow: active ? "0 8px 20px rgba(34,197,94,0.25)" : "none",

                "&:hover": {
                  background: active
                    ? "linear-gradient(to right, #22c55e, #16a34a)"
                    : "rgba(255,255,255,0.06)",
                },
              }}>
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: 42,
                }}>
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
          <ListItemIcon
            sx={{
              color: "#ef4444",
              minWidth: 42,
            }}>
            <Logout />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </List>

      {/* FOOTER */}

      <Box
        sx={{
          p: 2,
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.8rem",
        }}>
        © {new Date().getFullYear()} Delivery System
      </Box>
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
            linear-gradient(
              rgba(15,23,42,0.82),
              rgba(15,23,42,0.88)
            ),
            url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1974&auto=format&fit=crop")
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
          minHeight: "100vh",
        }}>
        {/* ================= TOPBAR ================= */}

        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },

            ml: { md: `${drawerWidth}px` },

            bgcolor: "rgba(255,255,255,0.08)",

            backdropFilter: "blur(18px)",

            borderBottom: "1px solid rgba(255,255,255,0.08)",

            color: "#fff",
          }}>
          <Toolbar
            sx={{
              minHeight: "75px !important",
              px: { xs: 2, md: 4 },
            }}>
            {/* MOBILE MENU */}

            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{
                mr: 2,
                display: { md: "none" },

                bgcolor: "rgba(255,255,255,0.12)",

                color: "#fff",

                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                },
              }}>
              <MenuIcon />
            </IconButton>

            {/* TITLE */}

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  color: "#fff",
                }}>
                Customer Dashboard
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                }}>
                Manage your deliveries, payments and addresses
              </Typography>
            </Box>

            {/* USER */}


            <IconButton
  component={Link}
  to="/customer/notifications"
  sx={{
    mr: 2,
    color: "#fff",
  }}
>
  <Badge
    badgeContent={notificationCount}
    color="error"
  >
    <Notifications />
  </Badge>
</IconButton>

            <Tooltip title={user?.name || "Customer"}>
              <Avatar
                sx={{
                  bgcolor: "#22c55e",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                {user?.name?.charAt(0)?.toUpperCase() || "C"}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* ================= SIDEBAR ================= */}

        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}>
          {/* MOBILE DRAWER */}

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
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

          {/* DESKTOP DRAWER */}

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },

              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
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
          <Toolbar
            sx={{
              minHeight: "75px !important",
            }}
          />

          <Container
            maxWidth="xl"
            sx={{
              py: { xs: 2, md: 4 },
              px: { xs: 2, md: 4 },
            }}>
            {/* THIS MAKES ALL CARDS APPEAR CLEARLY */}

            <Box
              sx={{
                position: "relative",
                zIndex: 5,
              }}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
