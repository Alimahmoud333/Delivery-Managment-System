import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  Button,
  Divider,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import API from "../../api/axios";
import SectionTitle from "../../components/common/SectionTitle";
import RatingForm from "./RatingForm";

import { useNavigate } from "react-router-dom";



import {
  useCustomer,
  useCustomerDispatch,
} from "../../context/customerContext";

import { useModal } from "../../context/ModalContext";

export default function Orders() {
  const { orders } = useCustomer();

  const dispatch = useCustomerDispatch();

  const { showModal, closeModal } = useModal();

  const [loadingCancelId, setLoadingCancelId] = useState(null);


  const navigate = useNavigate();
  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {
    try {
      const res = await API.get("/customer/orders");

      dispatch({
        type: "set_orders",
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= STATUS COLORS ================= */

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";

      case "accepted":
        return "info";

      case "on_the_way":
        return "primary";

      case "delivered":
        return "success";

      case "canceled":
        return "error";

      default:
        return "default";
    }
  };

  /* ================= RATE ================= */

  const canRate = (order) => order.status === "delivered" && !order.has_rating;

  const openRatingModal = (order) => {
    showModal(
      "Rate Driver",

      <RatingForm
        order={order}
        onClose={closeModal}
        onSuccess={() => {
          /* ✅ disable rating instantly */

          dispatch({
            type: "update_order",

            payload: {
              ...order,
              has_rating: true,
            },
          });

          closeModal();

          fetchOrders();
        }}
      />,
    );
  };

  /* ================= CANCEL ORDER ================= */

  const cancelOrder = async (id) => {
    setLoadingCancelId(id);

    try {
      const res = await API.post(`/customer/orders/${id}/cancel`);

      dispatch({
        type: "update_order",
        payload: res.data,
      });

      fetchOrders();
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoadingCancelId(null);
    }
  };

  /* ================= UI ================= */

  return (
    <Container maxWidth="lg">
      <SectionTitle
        title="My Orders"
        sx={{
          color: "#fff",

          "& .MuiTypography-root": {
            color: "#fff",
            fontWeight: 800,
          },
        }}
      />

      <Stack spacing={4} mt={4}>
        {orders.map((order, index) => (
          <Card
            key={order.id}
            sx={{
              borderRadius: 5,

              overflow: "hidden",

              border: "1px solid #e5e7eb",

              background:
                "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",

              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",

              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",

                boxShadow: "0 14px 30px rgba(0,0,0,0.10)",
              },
            }}>
            {/* TOP GREEN BAR */}

            <Box
              sx={{
                height: 8,

                background: "linear-gradient(to right, #22c55e, #16a34a)",
              }}
            />

            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* HEADER */}

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mb={3}>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      fontSize: {
                        xs: "1.2rem",
                        md: "1.6rem",
                      },
                    }}>
                    Order #{index + 1}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </Box>

                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  sx={{
                    fontWeight: 700,

                    textTransform: "capitalize",

                    px: 1.5,

                    py: 0.5,
                  }}
                />
              </Box>

              <Divider sx={{ mb: 3 }} />

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
                    <Typography
                      fontWeight={800}
                      mb={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>
                      📍 Pickup Address
                    </Typography>

                    <Typography color="#4b5563">
                      {order.pickup_address?.city} —{" "}
                      {order.pickup_address?.street}
                    </Typography>
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
                    <Typography
                      fontWeight={800}
                      mb={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>
                      🚚 Dropoff Address
                    </Typography>

                    <Typography color="#4b5563">
                      {order.dropoff_address?.city} —{" "}
                      {order.dropoff_address?.street}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* PRICE */}

              <Box
                mt={4}
                sx={{
                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  p: 2.5,

                  borderRadius: 4,

                  background: "linear-gradient(to right, #ecfdf5, #f0fdf4)",

                  border: "1px solid #bbf7d0",
                }}>
                <Typography fontWeight={800}>Total Price</Typography>

                <Typography fontWeight={900} fontSize="1.3rem" color="#16a34a">
                  ${order.price}
                </Typography>
              </Box>

              {/* ITEMS */}

              {order.items?.length > 0 && (
                <Box mt={4}>
                  <Typography fontWeight={800} mb={2} fontSize="1.05rem">
                    Order Items
                  </Typography>

                  <Stack spacing={2}>
                    {order.items.map((item, i) => (
                      <Paper
                        key={i}
                        elevation={0}
                        sx={{
                          p: 2,

                          borderRadius: 3,

                          border: "1px solid #e5e7eb",

                          background: "#fff",
                        }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center">
                          <Typography fontWeight={700}>
                            {item.item_name}
                          </Typography>

                          <Chip
                            label={`x${item.quantity}`}
                            size="small"
                            sx={{
                              fontWeight: 700,

                              bgcolor: "#f3f4f6",
                            }}
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* ACTIONS */}

              <Box
                mt={4}
                display="flex"
                justifyContent="flex-end"
                flexWrap="wrap"
                gap={2}>
                {(order.status === "pending" ||
                  order.status === "accepted") && (
                  <Button
                    variant="contained"
                    color="error"
                    disabled={loadingCancelId === order.id}
                    onClick={() => cancelOrder(order.id)}
                    sx={{
                      borderRadius: 3,

                      px: 3,

                      py: 1,

                      fontWeight: 700,

                      textTransform: "none",
                    }}>
                    {loadingCancelId === order.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </Button>
                )}
                {order.status === "delivered" && !order.has_rating && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => openRatingModal(order)}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1,
                      fontWeight: 800,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "none",
                      },
                    }}>
                    ⭐ Rate Driver
                  </Button>
                )}

                {order.payment?.status === "paid" ? (
                  <Chip label="Paid ✅" color="success" />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/customer/payment/${order.id}`)}>
                    💳 Pay Now
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* EMPTY */}

        {orders.length === 0 && (
          <Card
            sx={{
              borderRadius: 5,

              p: 8,

              textAlign: "center",

              background: "linear-gradient(to bottom, #ffffff, #fafafa)",

              border: "1px solid #e5e7eb",
            }}>
            <Typography variant="h6" fontWeight={700} color="text.secondary">
              No Orders Found
            </Typography>

            <Typography mt={1} color="text.secondary">
              Your delivery orders will appear here.
            </Typography>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
