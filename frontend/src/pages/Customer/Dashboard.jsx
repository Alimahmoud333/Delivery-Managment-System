import React, { useEffect, useState } from "react";

import { Typography, Card, CardContent, Grid, Box, Stack } from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import API from "../../api/axios";

import SectionTitle from "../../components/common/SectionTitle";

export default function CustomerDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    pending: 0,
    delivered: 0,
  });

  useEffect(() => {
    API.get("/customer/orders")
      .then((res) => {
        const orders = res.data;

        setStats({
          orders: orders.length,

          pending: orders.filter((o) => o.status === "pending").length,

          delivered: orders.filter((o) => o.status === "delivered").length,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 34 }} />,
      color: "#2563eb",
      bg: "#eff6ff",
    },

    {
      title: "Pending Orders",
      value: stats.pending,
      icon: <PendingActionsOutlinedIcon sx={{ fontSize: 34 }} />,
      color: "#d97706",
      bg: "#fffbeb",
    },

    {
      title: "Delivered Orders",
      value: stats.delivered,
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 34 }} />,
      color: "#16a34a",
      bg: "#f0fdf4",
    },
  ];

  return (
    <Box>
      {/* TITLE */}
      <SectionTitle
        title="Customer Dashboard"
        sx={{
          color: "#fff",

          "& .MuiTypography-root": {
            color: "#fff",
            fontWeight: 800,
          },
        }}
      />

      {/* WELCOME CARD */}
      {/* <Card
        sx={{
          mb: 4,

          borderRadius: 5,

          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",

          color: "#fff",

          overflow: "hidden",

          boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
        }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 1,
              letterSpacing: 0.5,
            }}>
            Welcome Back 👋
          </Typography>

          <Typography
            sx={{
              opacity: 0.9,
              fontSize: "1rem",
              maxWidth: 600,
            }}>
            Track your delivery orders, monitor pending requests, and manage
            your addresses easily from your dashboard.
          </Typography>
        </CardContent>
      </Card> */}

      {/* STATS */}
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 5,

                height: "100%",

                border: "1px solid #e5e7eb",

                background: "linear-gradient(to bottom, #ffffff, #fafafa)",

                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",

                transition: "all 0.3s ease",

                overflow: "hidden",

                "&:hover": {
                  transform: "translateY(-5px)",

                  boxShadow: "0 14px 30px rgba(0,0,0,0.10)",
                },
              }}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  {/* LEFT */}
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",

                        fontWeight: 600,

                        fontSize: "0.95rem",

                        mb: 1,
                      }}>
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={800}
                      sx={{
                        color: "#111827",
                        lineHeight: 1,
                      }}>
                      {card.value}
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

                      background: card.bg,

                      color: card.color,
                    }}>
                    {card.icon}
                  </Box>
                </Stack>

                {/* BOTTOM BAR */}
                <Box
                  sx={{
                    mt: 3,

                    height: 6,

                    borderRadius: 999,

                    background: card.bg,

                    overflow: "hidden",
                  }}>
                  <Box
                    sx={{
                      width: "70%",

                      height: "100%",

                      borderRadius: 999,

                      background: card.color,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
