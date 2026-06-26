import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage (saved at login)
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Notifications API response:", res.data);

      const list = Array.isArray(res.data) ? res.data : res.data.data || [];
      setNotifications(list);
    } catch (err) {
      console.error("Failed to load notifications", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/api/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
        ),
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  return (
    <Box minHeight="100vh">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Notifications
            </Typography>

            {loading ? (
              <Typography>Loading...</Typography>
            ) : notifications.length === 0 ? (
              <Typography color="text.secondary">
                No notifications yet.
              </Typography>
            ) : (
              <List>
                {Array.isArray(notifications) &&
                  notifications.map((n) => (
                    <ListItem
                      key={n.id}
                      disablePadding
                      sx={{
                        backgroundColor: n.read_at ? "transparent" : "#f0f4ff",
                        borderRadius: 2,
                        mb: 1,
                      }}>
                      <ListItemButton onClick={() => markAsRead(n.id)}>
                        <ListItemText
                          primary={
                            <Typography
                              fontWeight={n.read_at ? "normal" : "bold"}
                              color={n.read_at ? "text.primary" : "primary"}>
                              {n.data?.title || "Notification"}
                            </Typography>
                          }
                          secondary={n.data?.message}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
