// src/pages/customer/OrderForm.jsx

import React, { useState } from "react";

import {
  Button,
  Stack,
  MenuItem,
  IconButton,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import API from "../../api/axios";

import { useSnackbar } from "../../context/SnackbarContext";

import SectionTitle from "../../components/common/SectionTitle";

import CustomTextField from "../../components/common/CustomTextField";

import {
  useCustomer,
  useCustomerDispatch,
} from "../../context/customerContext";

export default function OrderForm() {
  const { showSnackbar } = useSnackbar();

  const { addresses } = useCustomer();

  const dispatch = useCustomerDispatch();

  const [loading, setLoading] = useState(false);

  const [serverErrors, setServerErrors] = useState({});

  const [form, setForm] = useState({
    pickup_address_id: "",
    dropoff_address_id: "",
    price: "",
  });

  const [items, setItems] = useState([
    {
      item_name: "",
      quantity: 1,
    },
  ]);

  /* =========================================
     ITEMS
  ========================================= */

  const addItem = () => {
    setItems([
      ...items,
      {
        item_name: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index) => {
    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const submit = async () => {
    if (loading) return;

    setServerErrors({});

    /* ================= VALIDATION ================= */

    if (!form.pickup_address_id || !form.dropoff_address_id) {
      showSnackbar("Please select pickup and dropoff addresses", "warning");

      return;
    }

    if (Number(form.pickup_address_id) === Number(form.dropoff_address_id)) {
      showSnackbar("Pickup and Dropoff cannot be the same", "warning");

      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      showSnackbar("Please enter valid price", "warning");

      return;
    }

    const invalidItem = items.find(
      (item) =>
        !item.item_name ||
        item.item_name.trim() === "" ||
        !item.quantity ||
        Number(item.quantity) <= 0,
    );

    if (invalidItem) {
      showSnackbar("Please fill all items correctly", "warning");

      return;
    }

    /* ================= PAYLOAD ================= */

    const payload = {
      pickup_address_id: Number(form.pickup_address_id),

      dropoff_address_id: Number(form.dropoff_address_id),

      price: Number(form.price),

      items: items.map((item) => ({
        item_name: item.item_name.trim(),

        quantity: Number(item.quantity),
      })),
    };

    console.log("PAYLOAD:", payload);

    try {
      setLoading(true);

      const res = await API.post("/customer/orders", payload);

      const order = res.data.order || res.data;

      dispatch({
        type: "upsert_order",
        payload: order,
      });

      if (res.data.message?.includes("existing order")) {
        showSnackbar("Items added to existing order", "success");
      } else {
        showSnackbar("Order created successfully", "success");
      }

      /* ================= RESET ================= */

      setForm({
        pickup_address_id: "",
        dropoff_address_id: "",
        price: "",
      });

      setItems([
        {
          item_name: "",
          quantity: 1,
        },
      ]);
    } catch (err) {
      console.error(err);

      /* ================= 422 VALIDATION ================= */

      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};

        setServerErrors(errors);

        console.log("VALIDATION ERRORS:", errors);

        const firstError = Object.values(errors)[0]?.[0];

        showSnackbar(firstError || "Validation Error", "error");
      } else {
        showSnackbar(
          err.response?.data?.message || "Failed to create order",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     UI
  ========================================= */
  console.log(addresses);
  return (
    <Card
      sx={{
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        borderRadius: 5,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}>
      {/* TOP BAR */}
      <Box
        sx={{
          height: 10,
          background: "linear-gradient(to right, #22c55e, #16a34a)",
        }}
      />

      <CardContent sx={{ p: 4 }}>
        <SectionTitle title="Create Delivery Order" />

        {/* ================= NO ADDRESS ================= */}

        {addresses.length === 0 && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            You must add addresses before creating an order.
          </Alert>
        )}

        {/* ================= SERVER ERRORS ================= */}

        {Object.keys(serverErrors).length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Validation Error From Server
          </Alert>
        )}

        <Stack spacing={4}>
          {/* ================= ADDRESSES ================= */}

          <Box>
            <Typography variant="h6" fontWeight={800} mb={2}>
              Delivery Addresses
            </Typography>

            <Stack spacing={3}>
              {/* PICKUP */}
              <CustomTextField
                select
                label="Pickup Address"
                value={form.pickup_address_id}
                error={!!serverErrors.pickup_address_id}
                helperText={serverErrors.pickup_address_id?.[0]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pickup_address_id: e.target.value,
                  })
                }>
                {addresses.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.city} - {a.street}
                  </MenuItem>
                ))}
              </CustomTextField>

              {/* DROPOFF */}
              <CustomTextField
                select
                label="Dropoff Address"
                value={form.dropoff_address_id}
                error={!!serverErrors.dropoff_address_id}
                helperText={serverErrors.dropoff_address_id?.[0]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dropoff_address_id: e.target.value,
                  })
                }>
                {addresses.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.city} - {a.street}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Stack>
          </Box>

          <Divider />

          {/* ================= ITEMS ================= */}

          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}>
              <Typography variant="h6" fontWeight={800}>
                Order Items
              </Typography>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addItem}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                }}>
                Add Item
              </Button>
            </Stack>

            <Stack spacing={2}>
              {items.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(to bottom, #fff, #fafafa)",
                    border: "1px solid #e5e7eb",
                  }}>
                  <Stack
                    direction={{
                      xs: "column",
                      md: "row",
                    }}
                    spacing={2}
                    alignItems="center">
                    <CustomTextField
                      fullWidth
                      label="Item Name"
                      value={item.item_name}
                      onChange={(e) =>
                        updateItem(index, "item_name", e.target.value)
                      }
                    />

                    <CustomTextField
                      label="Quantity"
                      type="number"
                      sx={{ width: 130 }}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", e.target.value)
                      }
                    />

                    {items.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* ================= PRICE ================= */}

          <Box>
            <Typography variant="h6" fontWeight={800} mb={2}>
              Pricing
            </Typography>

            <CustomTextField
              label="Total Price"
              type="number"
              error={!!serverErrors.price}
              helperText={serverErrors.price?.[0]}
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </Box>

          {/* ================= INFO ================= */}

          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <ShoppingBagIcon
                sx={{
                  color: "#16a34a",
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: "#166534",
                  fontWeight: 600,
                }}>
                If another order exists with the same addresses within 24 hours,
                items will be added automatically.
              </Typography>
            </Stack>
          </Paper>

          {/* ================= SUBMIT ================= */}

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={submit}
            disabled={loading || addresses.length === 0}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 800,
              py: 1.5,
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Order"
            )}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
