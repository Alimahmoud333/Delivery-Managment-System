import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Stack,
  LinearProgress,
  Divider,
} from "@mui/material";

import {
  ShoppingCart,
  LocalShipping,
  CheckCircle,
  People,
} from "@mui/icons-material";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import API from "../../api/axios";
import SectionTitle from "../../components/common/SectionTitle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

/* =========================
   STATS CARD
========================= */

function StatCard({ title, value, icon, gradient }) {
  return (
    <Card
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        background: gradient,
        color: "#fff",
        minHeight: 180,
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        },
      }}>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 4,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              fontWeight: 500,
            }}>
            {title}
          </Typography>

          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 56,
              height: 56,
            }}>
            {icon}
          </Avatar>
        </Box>

        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mt: 4,
          }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [bestDrivers, setBestDrivers] = useState([]);
  const [topDriversOrders, setTopDriversOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH
  ========================= */

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [statsRes, ratingRes, ordersRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/best-drivers"),
        API.get("/admin/top-drivers-orders"),
      ]);

      setStats(statsRes.data);
      setBestDrivers(ratingRes.data);
      setTopDriversOrders(ordersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress size={60} />
      </Box>
    );

  /* =========================
     PIE CHART
  ========================= */

  const ordersPie = {
    labels: ["Pending", "Delivered"],
    datasets: [
      {
        data: [stats.pending || 0, stats.delivered || 0],
        backgroundColor: ["#ff9800", "#4caf50"],
        borderWidth: 0,
      },
    ],
  };

  /* =========================
     BAR CHART
  ========================= */

  const bestDriversChart = {
    labels: bestDrivers.map((d) => d.driver),
    datasets: [
      {
        label: "Average Rating",
        data: bestDrivers.map((d) => d.rating),
        backgroundColor: "#5e35b1",
        borderRadius: 10,
      },
    ],
  };

  const topOrdersChart = {
    labels: topDriversOrders.map((d) => d.driver),
    datasets: [
      {
        label: "Total Deliveries",
        data: topDriversOrders.map((d) => d.orders),
        backgroundColor: "#0288d1",
        borderRadius: 10,
      },
    ],
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
      }}>
      <Container maxWidth="xl">
        <SectionTitle title="Admin Dashboard"
          sx={{
    color: "#fff",

    "& .MuiTypography-root": {
      color: "#fff",
      fontWeight: 800,
    },
  }} />

        {/* =========================
           STATISTICS
        ========================= */}

        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Total Orders"
              value={stats.orders || 0}
              icon={<ShoppingCart />}
              gradient="linear-gradient(135deg,#6C63FF,#5A54E8)"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Pending Orders"
              value={stats.pending || 0}
              icon={<LocalShipping />}
              gradient="linear-gradient(135deg,#ff9800,#ffb74d)"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Delivered Orders"
              value={stats.delivered || 0}
              icon={<CheckCircle />}
              gradient="linear-gradient(135deg,#4caf50,#81c784)"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Drivers"
              value={stats.drivers || 0}
              icon={<People />}
              gradient="linear-gradient(135deg,#00B4DB,#0083B0)"
            />
          </Grid>
        </Grid>

        {/* =========================
           CHARTS
        ========================= */}

        <Grid container spacing={3} mt={2}>
          {/* PIE */}
          <Grid item xs={12} lg={4}>
            <Card
              sx={{
                borderRadius: 5,
                height: "100%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Orders Status
                </Typography>

                <Box height={320}>
                  <Pie
                    data={ordersPie}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* BEST DRIVERS */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                borderRadius: 5,
                height: "100%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Best Rated Drivers
                </Typography>

                <Box height={320}>
                  <Bar
                    data={bestDriversChart}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* =========================
           LOWER SECTION
        ========================= */}

        <Grid container spacing={3} mt={2}>
          {/* TOP DELIVERY DRIVERS */}
          <Grid item xs={12} lg={7}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Drivers With Most Deliveries
                </Typography>

                <Box height={350}>
                  <Bar
                    data={topOrdersChart}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* DRIVER LIST */}
          <Grid item xs={12} lg={5}>
            <Card
              sx={{
                borderRadius: 5,
                height: "100%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Top Drivers Ratings
                </Typography>

                <Stack spacing={3}>
                  {bestDrivers.map((driver, index) => (
                    <Box key={index}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar>{driver.driver?.charAt(0) || "D"}</Avatar>

                          <Box>
                            <Typography fontWeight="bold">
                              {driver.driver}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              Rating: {driver.rating}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography fontWeight="bold">
                          {driver.rating}/5
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={(driver.rating / 5) * 100}
                        sx={{
                          height: 10,
                          borderRadius: 10,
                        }}
                      />

                      {index !== bestDrivers.length - 1 && (
                        <Divider sx={{ mt: 2 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
