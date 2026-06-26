import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ menuItems, drawerWidth }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0f172a",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      {/* Logo */}
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Delivery App
        </Typography>
      </Toolbar>

      <Box sx={{ px: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.title}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: "#2563eb",
                },
                "&:hover": {
                  backgroundColor: "#1e40af",
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}