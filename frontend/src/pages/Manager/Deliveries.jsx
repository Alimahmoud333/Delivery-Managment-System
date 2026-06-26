import React, { useEffect, useMemo, useState } from "react";

import {
  Paper,
  Typography,
  Stack,
  Chip,
  Box,
  Divider,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import API from "../../api/axios";

import { useSnackbar } from "../../context/SnackbarContext";

export default function Deliveries() {
  const { showSnackbar } = useSnackbar();

  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================================
     FILTERS
  ========================================= */

  const [statusFilter, setStatusFilter] = useState("all");

  const [search, setSearch] = useState("");

  /* =========================================
     FETCH
  ========================================= */

  const fetchDeliveries = async () => {
    try {
      const res = await API.get("/manager/deliveries");

      setDeliveries(res.data);
    } catch (err) {
      console.error(err);

      showSnackbar("Failed loading deliveries", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  /* =========================================
     STATUS COLOR
  ========================================= */

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";

      case "accepted":
        return "info";

      case "delivered":
        return "success";

      case "canceled":
        return "error";

      case "paid":
        return "primary";

      default:
        return "default";
    }
  };

  /* =========================================
     FILTERED DATA
  ========================================= */

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((d) => {
      const orderStatus = d.order?.status || "";

      const matchesStatus =
        statusFilter === "all" || orderStatus === statusFilter;

      const matchesSearch =
        d.order?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.driver?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        String(d.order?.id).includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [deliveries, statusFilter, search]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}>
        <CircularProgress />
      </Box>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <Stack spacing={4}>
      {/* HEADER */}
      <Box>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "#111827",
            mb: 1,
          }}>
          Deliveries Management
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontSize: "1rem",
          }}>
          Monitor all assigned deliveries and track order statuses.
        </Typography>
      </Box>

      {/* FILTERS */}
      <Paper
        elevation={0}
        sx={{
          p: 3,

          borderRadius: 5,

          border: "1px solid #e5e7eb",

          background: "linear-gradient(to bottom, #ffffff, #fafafa)",

          boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
        }}>
        <Grid container spacing={3}>
          {/* SEARCH */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search customer, driver or order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Grid>

          {/* STATUS FILTER */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}>
              <MenuItem value="all">All Statuses</MenuItem>

              <MenuItem value="pending">Pending</MenuItem>

              <MenuItem value="accepted">Accepted</MenuItem>

              <MenuItem value="delivered">Delivered</MenuItem>

              <MenuItem value="paid">Paid</MenuItem>

              <MenuItem value="canceled">Canceled</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* EMPTY */}
      {filteredDeliveries.length === 0 ? (
        <Paper
          sx={{
            p: 6,

            textAlign: "center",

            borderRadius: 5,

            border: "1px solid #e5e7eb",

            background: "linear-gradient(to bottom, #ffffff, #fafafa)",
          }}>
          <Typography variant="h6" fontWeight={700}>
            No deliveries found
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredDeliveries.map((d, index) => (
            <Grid item xs={12} lg={6} key={d.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,

                  borderRadius: 5,

                  border: "1px solid #e5e7eb",

                  background: "linear-gradient(to bottom, #ffffff, #fafafa)",

                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",

                  transition: "all 0.3s ease",

                  height: "100%",

                  "&:hover": {
                    transform: "translateY(-4px)",

                    boxShadow: "0 14px 32px rgba(0,0,0,0.10)",
                  },
                }}>
                {/* TOP */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{
                        color: "#111827",
                      }}>
                      Delivery {index + 1}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#6b7280",

                        mt: 0.5,
                      }}>
                      Order ID:
                    
                      {d.order?.id}
                    </Typography>
                  </Box>

                  {/* RECTANGLE STATUS */}
                  <Chip
                    label={d.order?.status}
                    color={getStatusColor(d.order?.status)}
                    sx={{
                      borderRadius: 1,

                      fontWeight: 700,

                      textTransform: "capitalize",

                      px: 1,

                      height: 30,
                    }}
                  />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* CONTENT */}
                <Stack spacing={2.5}>
                  {/* CUSTOMER */}
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <PersonOutlineOutlinedIcon
                      sx={{
                        color: "#2563eb",
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",

                          color: "#6b7280",

                          fontWeight: 600,
                        }}>
                        Customer
                      </Typography>

                      <Typography fontWeight={700}>
                        {d.order?.user?.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* DRIVER */}
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <LocalShippingOutlinedIcon
                      sx={{
                        color: "#16a34a",
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",

                          color: "#6b7280",

                          fontWeight: 600,
                        }}>
                        Driver
                      </Typography>

                      <Typography fontWeight={700}>
                        {d.driver?.user?.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* STATUS */}
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Inventory2OutlinedIcon
                      sx={{
                        color: "#9333ea",
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",

                          color: "#6b7280",

                          fontWeight: 600,
                        }}>
                        Status
                      </Typography>

                      <Typography
                        fontWeight={700}
                        sx={{
                          textTransform: "capitalize",
                        }}>
                        {d.order?.status}
                      </Typography>
                    </Box>
                  </Box>

                  {/* DATE */}
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <AccessTimeOutlinedIcon
                      sx={{
                        color: "#f59e0b",
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",

                          color: "#6b7280",

                          fontWeight: 600,
                        }}>
                        Assigned At
                      </Typography>

                      <Typography fontWeight={600}>
                        {new Date(d.assigned_at).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
