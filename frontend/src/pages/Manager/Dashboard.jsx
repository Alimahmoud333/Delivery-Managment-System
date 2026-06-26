import React, { useEffect, useState } from "react";

import { Grid, Paper, Typography, Box, Stack, Divider } from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import API from "../../api/axios";

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    deliveries: 0,
  });

  /* =========================================
     FETCH STATS
  ========================================= */

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ordersRes = await API.get("/manager/orders");

        const deliveriesRes = await API.get("/manager/deliveries");

        setStats({
          orders: ordersRes.data.length,

          deliveries: deliveriesRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  /* =========================================
     CARD STYLE
  ========================================= */

  const cardStyle = {
    position: "relative",

    overflow: "hidden",

    borderRadius: 5,

    p: 4,

    height: "100%",

    background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",

    border: "1px solid #e5e7eb",

    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",

    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-5px)",

      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
    },
  };

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
          Manager Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontSize: "1rem",
            fontWeight: 500,
          }}>
          Overview of orders and deliveries
        </Typography>
      </Box>

      {/* STATS */}
      <Grid container spacing={4}>
        {/* ORDERS */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={cardStyle}>
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
                    fontSize: "1rem",
                    mb: 1,
                  }}>
                  Total Orders
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    color: "#111827",
                  }}>
                  {stats.orders}
                </Typography>
              </Box>

              {/* ICON */}
              <Box
                sx={{
                  width: 70,
                  height: 70,

                  borderRadius: 4,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",

                  color: "#fff",
                }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 34 }} />
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* FOOTER */}
            <Typography
              sx={{
                color: "#6b7280",
                fontWeight: 500,
              }}>
              All customer orders in the system
            </Typography>
          </Paper>
        </Grid>

        {/* DELIVERIES */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={cardStyle}>
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
                    fontSize: "1rem",
                    mb: 1,
                  }}>
                  Total Deliveries
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    color: "#111827",
                  }}>
                  {stats.deliveries}
                </Typography>
              </Box>

              {/* ICON */}
              <Box
                sx={{
                  width: 70,
                  height: 70,

                  borderRadius: 4,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: "linear-gradient(135deg, #16a34a, #15803d)",

                  color: "#fff",
                }}>
                <LocalShippingOutlinedIcon sx={{ fontSize: 34 }} />
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* FOOTER */}
            <Typography
              sx={{
                color: "#6b7280",
                fontWeight: 500,
              }}>
              Deliveries assigned to drivers
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
