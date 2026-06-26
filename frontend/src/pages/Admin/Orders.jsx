import React, { useEffect, useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Collapse,
  Box,
  Typography,
  Stack,
  MenuItem,
  TextField,
  Chip,
  InputAdornment,
} from "@mui/material";

import {
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import API from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [expanded, setExpanded] = useState(null);

  /* =========================================
     FILTERS
  ========================================= */

  const [statusFilter, setStatusFilter] = useState("all");

  const [search, setSearch] = useState("");

  /* =========================================
     FETCH ORDERS
  ========================================= */

  const fetchOrders = () => {
    API.get("/admin/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =========================================
     FILTERED ORDERS
  ========================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ? true : order.status === statusFilter;

      const matchesSearch =
        order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  /* =========================================
     STATUS COLORS
  ========================================= */

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";

      case "accepted":
        return "info";

      case "processing":
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
     STATUS LEGEND
  ========================================= */

  const statusLegend = [
    {
      label: "Pending",
      value: "pending",
      color: "warning",
    },

    {
      label: "Accepted",
      value: "accepted",
      color: "info",
    },

    {
      label: "Processing",
      value: "processing",
      color: "secondary",
    },

    {
      label: "Delivered",
      value: "delivered",
      color: "success",
    },

    {
      label: "Cancelled",
      value: "cancelled",
      color: "error",
    },
  ];

  /* =========================================
     UI
  ========================================= */

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
      }}>
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #eee",
          background: "#fafafa",
        }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          spacing={3}>
          {/* LEFT */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Orders Management
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Total Orders: {filteredOrders.length}
            </Typography>

            {/* STATUS LEGEND */}
            <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
              {statusLegend.map((item) => (
                <Chip
                  key={item.value}
                  label={item.label}
                  color={item.color}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    px: 1,
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* FILTERS */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Search by ID or customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 260 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            {/* STATUS FILTER */}
            <TextField
              select
              size="small"
              label="Filter Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 200 }}>
              <MenuItem value="all">All Status</MenuItem>

              <MenuItem value="pending">Pending</MenuItem>

              <MenuItem value="accepted">Accepted</MenuItem>

              <MenuItem value="processing">Processing</MenuItem>

              <MenuItem value="delivered">Delivered</MenuItem>

              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </Box>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>#</TableCell>

            <TableCell>Customer</TableCell>

            <TableCell>Status</TableCell>

            <TableCell>Total Items</TableCell>

            <TableCell>Total Price</TableCell>

            <TableCell>Driver</TableCell>

            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredOrders.map((order, index) => (
            <React.Fragment key={order.id}>
              {/* MAIN ROW */}
              <TableRow
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",

                  transition: "0.2s",

                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}>
                {/* LOCAL ID */}
                <TableCell>{index + 1}</TableCell>

                {/* CUSTOMER */}
                <TableCell>
                  <Typography fontWeight="600">{order.user?.name}</Typography>
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      px: 1,
                    }}
                  />
                </TableCell>

                {/* ITEMS */}
                <TableCell>{order.items?.length || 0}</TableCell>

                {/* PRICE */}
                <TableCell>
                  <Typography fontWeight="bold">${order.price}</Typography>
                </TableCell>

                {/* DRIVER */}
                <TableCell>
                  {order.delivery?.driver?.user?.name || "N/A"}
                </TableCell>

                {/* ACTION */}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={
                      expanded === order.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )
                    }
                    onClick={() =>
                      setExpanded(expanded === order.id ? null : order.id)
                    }>
                    {expanded === order.id ? "Hide" : "Details"}
                  </Button>
                </TableCell>
              </TableRow>

              {/* DETAILS */}
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    p: 0,
                    border: 0,
                  }}>
                  <Collapse
                    in={expanded === order.id}
                    timeout="auto"
                    unmountOnExit>
                    <Box
                      sx={{
                        m: 2,
                        p: 2,
                        borderRadius: 3,
                        background: "#f8fafc",
                        border: "1px solid #eee",
                      }}>
                      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                        Order Items
                      </Typography>

                      <Table size="small">
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor: "#e2e8f0",
                            }}>
                            <TableCell>Product</TableCell>

                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {order.items?.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.item_name}</TableCell>

                              <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                          ))}

                          {order.items?.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={2} align="center">
                                No items
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}

          {/* EMPTY */}
          {filteredOrders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography py={4} color="text.secondary">
                  No orders found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
