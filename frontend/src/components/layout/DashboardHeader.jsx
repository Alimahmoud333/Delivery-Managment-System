import { Box, Typography, Button, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader({ title }) {
  const { logout } = useAuth();

  return (
    <Paper
      elevation={1}
      sx={{
        px: 4,
        py: 2,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderRadius: 0,
        backgroundColor: "#ffffff",
      }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>

        <Button
          variant="contained"
          onClick={logout}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            backgroundColor: "#ef4444",
            "&:hover": {
              backgroundColor: "#dc2626",
            },
          }}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
}
