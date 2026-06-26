import React, { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import API from "../../api/axios";

import { useSnackbar } from "../../context/SnackbarContext";

const STATUSES = ["pending", "accepted", "picked_up", "delivered", "cancelled"];

export default function AssignOrders() {
  const { showSnackbar } = useSnackbar();

  const [orders, setOrders] = useState([]);

  const [drivers, setDrivers] = useState({});

  const [selectedDriver, setSelectedDriver] = useState({});

  const [statusMap, setStatusMap] = useState({});

  /* =========================================
     LOAD DATA
  ========================================= */

  const fetchData = async () => {
    try {
      const ordersRes = await API.get("/manager/orders");

      const driversRes = await API.get("/manager/drivers");

      setOrders(ordersRes.data);

      /* DRIVERS MAP */
      const map = {};

      driversRes.data.forEach((d) => {
        map[d.id] = d;
      });

      setDrivers(map);

      /* DEFAULT VALUES */
      const driversDefault = {};
      const statusDefault = {};

      ordersRes.data.forEach((order) => {
        driversDefault[order.id] = order.delivery?.driver_id || "";

        statusDefault[order.id] = order.status || "pending";
      });

      setSelectedDriver(driversDefault);

      setStatusMap(statusDefault);
    } catch {
      showSnackbar("Loading failed", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================
     ASSIGN DRIVER
  ========================================= */

  const assignDriver = async (orderId) => {
    const driverId = selectedDriver[orderId];

    if (!driverId) {
      return showSnackbar("Choose driver first", "warning");
    }

    try {
      await API.post(`/manager/assign-driver/${orderId}/${driverId}`);

      showSnackbar("Driver assigned", "success");

      fetchData();
    } catch {
      showSnackbar("Assign failed", "error");
    }
  };

  /* =========================================
     UPDATE STATUS
  ========================================= */

  const updateStatus = async (orderId) => {
    const status = statusMap[orderId];

    if (!status) {
      return showSnackbar("Select status", "warning");
    }

    try {
      await API.post(`/manager/orders/${orderId}/${status}`);

      showSnackbar("Status updated successfully ✅", "success");

      fetchData();
    } catch {
      showSnackbar("Status update failed", "error");
    }
  };

  /* =========================================
     STATUS COLOR
  ========================================= */

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";

      case "accepted":
        return "info";

      case "picked_up":
        return "secondary";

      case "delivered":
        return "success";

      case "cancelled":
        return "error";

      default:
        return "default";
    }
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "#111827",
            mb: 1,
          }}>
          Orders Management
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontSize: "1rem",
          }}>
          Assign drivers and manage order statuses.
        </Typography>
      </Box>

      {/* ORDERS */}
      <Stack spacing={4}>
        {orders.map((order, index) => (
          <Paper
            key={order.id}
            elevation={0}
            sx={{
              p: 4,

              borderRadius: 5,

              border: "1px solid #e5e7eb",

              background: "linear-gradient(to bottom, #ffffff, #fafafa)",

              boxShadow: "0 6px 24px rgba(0,0,0,0.06)",

              transition: "all 0.3s ease",

              "&:hover": {
                transform: "translateY(-4px)",

                boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
              },
            }}>
            {/* HEADER */}
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              spacing={2}
              alignItems={{
                xs: "flex-start",
                md: "center",
              }}>
              {/* LEFT */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    color: "#111827",
                    mb: 1,
                  }}>
                  Order {index + 1}
                </Typography>

                <Typography
                  sx={{
                    color: "#4b5563",
                    fontWeight: 500,
                  }}>
                  Customer:
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      color: "#111827",
                      fontWeight: 700,
                    }}>
                    {order.user?.name || "Unknown"}
                  </Box>
                </Typography>
              </Box>

              {/* STATUS */}
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                sx={{
                  borderRadius: 1,

                  fontWeight: 700,

                  textTransform: "capitalize",

                  px: 1,

                  height: 30,
                }}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* DRIVER SECTION */}
            <Box mb={4}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <LocalShippingOutlinedIcon
                  sx={{
                    color: "#2563eb",
                  }}
                />

                <Typography
                  fontWeight={700}
                  sx={{
                    color: "#111827",
                  }}>
                  Assign Driver
                </Typography>
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Driver</InputLabel>

                  <Select
                    label="Select Driver"
                    value={selectedDriver[order.id] || ""}
                    onChange={(e) =>
                      setSelectedDriver({
                        ...selectedDriver,

                        [order.id]: e.target.value,
                      })
                    }
                    sx={{
                      borderRadius: 3,

                      background: "#fff",
                    }}>
                    <MenuItem value="">No Driver</MenuItem>

                    {Object.values(drivers).map((driver) => (
                      <MenuItem key={driver.id} value={driver.id}>
                        {driver.user?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  onClick={() => assignDriver(order.id)}
                  sx={{
                    borderRadius: 3,

                    minWidth: 180,

                    fontWeight: 700,

                    textTransform: "none",

                    boxShadow: "none",

                    py: 1.2,
                  }}>
                  Assign Driver
                </Button>
              </Stack>
            </Box>

            {/* STATUS SECTION */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Inventory2OutlinedIcon
                  sx={{
                    color: "#9333ea",
                  }}
                />

                <Typography
                  fontWeight={700}
                  sx={{
                    color: "#111827",
                  }}>
                  Update Status
                </Typography>
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Order Status</InputLabel>

                  <Select
                    label="Order Status"
                    value={statusMap[order.id] || ""}
                    onChange={(e) =>
                      setStatusMap({
                        ...statusMap,

                        [order.id]: e.target.value,
                      })
                    }
                    sx={{
                      borderRadius: 3,

                      background: "#fff",
                    }}>
                    {STATUSES.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => updateStatus(order.id)}
                  sx={{
                    borderRadius: 3,

                    minWidth: 180,

                    fontWeight: 700,

                    textTransform: "none",

                    boxShadow: "none",

                    py: 1.2,
                  }}>
                  Update Status
                </Button>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
