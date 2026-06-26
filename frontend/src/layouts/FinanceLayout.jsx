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
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 280;

const navItems = [
  { label: "Dashboard", to: "/finance" },
  { label: "Payments", to: "/finance/payments" },
  { label: "Transactions", to: "/finance/transactions" },
  { label: "Invoices", to: "/finance/invoices" },
  { label: "Messages", to: "/finance/messages" },
];

export default function FinanceLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #052e16 0%, #064e3b 100%)",
        color: "#fff",
      }}>
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
          <AccountBalanceWalletIcon />
        </Avatar>

        <Box>
          <Typography fontWeight={800}>
            Finance Panel
          </Typography>

          <Typography variant="body2" color="#bbf7d0">
            Payment Management
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography fontWeight={700}>
          {user?.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#bbf7d0",
            textTransform: "capitalize",
          }}>
          {user?.role}
        </Typography>
      </Box>

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

              "&.Mui-selected": {
                bgcolor: "#22c55e",
                color: "#fff",
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

      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,

            "&:hover": {
              bgcolor: "#dc2626",
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
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { md: "none" },
              mr: 2,
            }}>
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography fontWeight={800} fontSize="1.2rem">
              Finance Dashboard
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Payments and transactions overview
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

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
            },
          }}>
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ minHeight: "72px !important" }} />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}