import React, { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Chip,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import API from "../../api/axios";

export default function DriverDashboard() {
  const [available, setAvailable] = useState(false);

  /* =========================================
     TOGGLE AVAILABILITY
  ========================================= */

  const toggleAvailability = async () => {
    try {
      const res = await API.post("/driver/toggle-availability");

      setAvailable(res.data.available);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    toggleAvailability();
  }, []);

  /* =========================================
     UI
  ========================================= */

  return (
    <Box>
      {/* HEADER */}
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "#111827",
            mb: 1,
          }}>
          Driver Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontWeight: 500,
          }}>
          Manage your delivery availability status
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 5,

              overflow: "hidden",

              border: "1px solid #e5e7eb",

              background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",

              boxShadow: "0 4px 18px rgba(0,0,0,0.06)",

              transition: "all 0.3s ease",

              "&:hover": {
                transform: "translateY(-4px)",

                boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
              },
            }}>
            <CardContent sx={{ p: 4 }}>
              {/* TOP */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                      mb: 1,
                    }}>
                    Driver Status
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      color: "#111827",
                    }}>
                    {available ? "Online" : "Offline"}
                  </Typography>
                </Box>

                {/* ICON */}
                <Box
                  sx={{
                    width: 72,
                    height: 72,

                    borderRadius: 4,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    background: available
                      ? "linear-gradient(135deg, #16a34a, #15803d)"
                      : "linear-gradient(135deg, #ef4444, #dc2626)",

                    color: "#fff",
                  }}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 36 }} />
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* STATUS */}
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                  }}>
                  Current Availability:
                </Typography>

                <Chip
                  label={available ? "ONLINE" : "OFFLINE"}
                  color={available ? "success" : "error"}
                  sx={{
                    borderRadius: 1,

                    fontWeight: 700,

                    letterSpacing: 0.5,

                    px: 1,
                  }}
                />
              </Stack>

              {/* BUTTON */}
              <Button
                fullWidth
                variant="contained"
                onClick={toggleAvailability}
                sx={{
                  py: 1.4,

                  borderRadius: 3,

                  fontSize: "1rem",

                  fontWeight: 700,

                  textTransform: "none",

                  boxShadow: "none",

                  background: available
                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                    : "linear-gradient(135deg, #16a34a, #15803d)",

                  "&:hover": {
                    boxShadow: "none",
                  },
                }}>
                {available ? "Go Offline" : "Go Online"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
