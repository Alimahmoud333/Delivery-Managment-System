import React, { useEffect, useState, useCallback } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Box,
  Grid,
} from "@mui/material";

import API from "../../api/axios";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import AddressMap from "./AddressMap";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  const [error, setError] = useState("");

  const [selectedAddress, setSelectedAddress] = useState(null);

  /* =========================================
     FETCH DELIVERIES
  ========================================= */

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/driver/deliveries");

      console.log(res.data);

      setDeliveries(res.data || []);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  /* =========================================
     DELIVERY ACTIONS
  ========================================= */

  const action = async (id, type) => {
    try {
      setActionLoading(id);

      await API.post(`/driver/deliveries/${id}/${type}`);

      await fetchDeliveries();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================
     STATUS COLORS
  ========================================= */

  const statusColor = (status) => {
    switch (status) {
      case "assigned":
        return "default";

      case "accepted":
        return "warning";

      case "in_transit":
        return "info";

      case "delivered":
        return "success";

      default:
        return "default";
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading)
    return (
      <Stack alignItems="center" mt={10} spacing={2}>
        <CircularProgress />

        <Typography
          sx={{
            color: "#6b7280",
            fontWeight: 500,
          }}>
          Loading deliveries...
        </Typography>
      </Stack>
    );

  /* =========================================
     ERROR
  ========================================= */

  if (error)
    return (
      <Alert
        severity="error"
        sx={{
          mt: 3,
          borderRadius: 3,
        }}>
        {error}
      </Alert>
    );

  /* =========================================
     MAP VIEW
  ========================================= */

  if (selectedAddress)
    return (
      <AddressMap
        address={selectedAddress}
        onBack={() => setSelectedAddress(null)}
      />
    );

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
          My Deliveries
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontWeight: 500,
          }}>
          Manage your assigned deliveries
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* EMPTY */}
        {deliveries.length === 0 && (
          <Alert
            severity="info"
            sx={{
              borderRadius: 3,
            }}>
            No deliveries assigned yet
          </Alert>
        )}

        {/* DELIVERY CARDS */}
        {deliveries.map((d, index) => {
          const order = d.order || {};

          /* FIXED HERE */
          const pickup = order.pickup_address;

          const dropoff = order.dropoff_address;

          return (
            <Card
              key={d.id}
              sx={{
                borderRadius: 5,

                overflow: "hidden",

                border: "1px solid #e5e7eb",

                background:
                  "linear-gradient(to bottom right, #ffffff, #f8fafc)",

                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",

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
                        fontWeight: 500,
                        mt: 0.5,
                      }}>
                      Order ID: #{order.id}
                    </Typography>
                  </Box>

                  {/* STATUS */}
                  <Chip
                    label={d.status}
                    color={statusColor(d.status)}
                    sx={{
                      borderRadius: 1,

                      fontWeight: 700,

                      px: 1,

                      textTransform: "capitalize",

                      letterSpacing: 0.3,
                    }}
                  />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* CUSTOMER */}
                <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                  <PersonOutlineOutlinedIcon color="primary" />

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                      }}>
                      Customer
                    </Typography>

                    <Typography
                      sx={{
                        color: "#6b7280",
                      }}>
                      {order?.user?.name || "Unknown"}
                    </Typography>
                  </Box>
                </Stack>

                {/* ADDRESSES */}
                <Grid container spacing={3}>
                  {/* PICKUP */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,

                        borderRadius: 4,

                        background: "#f9fafb",

                        border: "1px solid #eef2f7",

                        height: "100%",
                      }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}>
                        <LocationOnOutlinedIcon color="primary" />

                        <Typography
                          fontWeight={700}
                          sx={{
                            color: "#111827",
                          }}>
                          Pickup Address
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          color: "#6b7280",
                          mb: 2,
                        }}>
                        {pickup
                          ? `${pickup.street}, ${pickup.city}`
                          : "No pickup address"}
                      </Typography>

                      {pickup && (
                        <Button
                          variant="outlined"
                          onClick={() => setSelectedAddress(pickup)}
                          sx={{
                            borderRadius: 2,

                            textTransform: "none",

                            fontWeight: 700,
                          }}>
                          View on Map
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  {/* DROPOFF */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,

                        borderRadius: 4,

                        background: "#f9fafb",

                        border: "1px solid #eef2f7",

                        height: "100%",
                      }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}>
                        <LocalShippingOutlinedIcon color="success" />

                        <Typography
                          fontWeight={700}
                          sx={{
                            color: "#111827",
                          }}>
                          Dropoff Address
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          color: "#6b7280",
                          mb: 2,
                        }}>
                        {dropoff
                          ? `${dropoff.street}, ${dropoff.city}`
                          : "No dropoff address"}
                      </Typography>

                      {dropoff && (
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => setSelectedAddress(dropoff)}
                          sx={{
                            borderRadius: 2,

                            textTransform: "none",

                            fontWeight: 700,
                          }}>
                          View on Map
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                {/* ACTION BUTTONS */}
                <Stack
                  direction="row"
                  spacing={2}
                  mt={4}
                  justifyContent="flex-end">
                  {d.status === "assigned" && (
                    <Button
                      variant="contained"
                      disabled={actionLoading === d.id}
                      onClick={() => action(d.id, "accept")}
                      sx={{
                        borderRadius: 3,

                        px: 3,

                        py: 1.2,

                        fontWeight: 700,

                        textTransform: "none",

                        boxShadow: "none",
                      }}>
                      {actionLoading === d.id
                        ? "Processing..."
                        : "Accept Delivery"}
                    </Button>
                  )}

                  {d.status === "accepted" && (
                    <Button
                      variant="contained"
                      color="warning"
                      disabled={actionLoading === d.id}
                      onClick={() => action(d.id, "start")}
                      sx={{
                        borderRadius: 3,

                        px: 3,

                        py: 1.2,

                        fontWeight: 700,

                        textTransform: "none",

                        boxShadow: "none",
                      }}>
                      {actionLoading === d.id
                        ? "Processing..."
                        : "Start Delivery"}
                    </Button>
                  )}

                  {d.status === "in_transit" && (
                    <Button
                      variant="contained"
                      color="success"
                      disabled={actionLoading === d.id}
                      onClick={() => action(d.id, "delivered")}
                      sx={{
                        borderRadius: 3,

                        px: 3,

                        py: 1.2,

                        fontWeight: 700,

                        textTransform: "none",

                        boxShadow: "none",
                      }}>
                      {actionLoading === d.id
                        ? "Processing..."
                        : "Mark Delivered"}
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
