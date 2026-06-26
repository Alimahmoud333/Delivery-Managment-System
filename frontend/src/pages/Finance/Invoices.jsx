import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Divider,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableContainer,
  InputAdornment,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchIcon from "@mui/icons-material/Search";
import PaidIcon from "@mui/icons-material/Paid";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import API from "../../api/axios";

export default function Invoices() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* =========================================
     FETCH PAYMENTS
  ========================================= */
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/finance/payments");

      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     FILTERED DATA
  ========================================= */
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;

      const matchesSearch =
        p.order?.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        String(p.id).includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [payments, statusFilter, search]);

  /* =========================================
     TOTALS
  ========================================= */
  const totalRevenue = filteredPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );

  const paidCount = filteredPayments.filter(
    (p) => p.status === "paid",
  ).length;

  /* =========================================
     PDF GENERATOR
  ========================================= */
  const generateInvoice = (payment) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Delivery System Invoice", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice ID: #${payment.id}`, 14, 35);

    doc.text(
      `Date: ${new Date(payment.created_at).toLocaleDateString()}`,
      14,
      43,
    );

    doc.setFontSize(14);
    doc.text("Customer Information", 14, 58);

    doc.setFontSize(11);

    doc.text(
      `Customer: ${payment.order?.user?.name || "N/A"}`,
      14,
      68,
    );

    doc.text(
      `Email: ${payment.order?.user?.email || "N/A"}`,
      14,
      76,
    );

    doc.setFontSize(14);
    doc.text("Order Information", 14, 94);

    autoTable(doc, {
      startY: 100,

      head: [["Field", "Value"]],

      body: [
        ["Order ID", payment.order?.id || "N/A"],
        ["Transaction ID", payment.transaction_id || "N/A"],
        ["Payment Status", payment.status],
        ["Amount", `$${payment.amount}`],
      ],
    });

    const items =
      payment.order?.items?.map((item) => [
        item.item_name,
        item.quantity,
      ]) || [];

    if (items.length > 0) {
      doc.text("Items", 14, doc.lastAutoTable.finalY + 15);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,

        head: [["Item", "Quantity"]],

        body: items,
      });
    }

    doc.setFontSize(10);

    doc.text(
      "Thank you for using our delivery system.",
      14,
      285,
    );

    doc.save(`invoice-${payment.id}.pdf`);
  };

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
    <Box>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "start", md: "center" }}
        spacing={2}
        mb={4}>
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "#111827",
              mb: 1,
            }}>
            Invoices
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              fontWeight: 500,
            }}>
            Generate and download customer invoices
          </Typography>
        </Box>

        <Box
          sx={{
            width: 75,
            height: 75,
            borderRadius: 4,
            background: "rgba(145,28,139,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ReceiptLongIcon
            sx={{
              fontSize: 40,
              color: "primary.main",
            }}
          />
        </Box>
      </Stack>

      {/* STATS */}
      <Grid container spacing={3} mb={4}>
        {/* REVENUE */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 5,
              border: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, rgba(34,197,94,0.08), #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}>
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                    }}>
                    Total Revenue
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color="success.main"
                    mt={1}>
                    ${totalRevenue}
                  </Typography>
                </Box>

                <PaidIcon
                  sx={{
                    fontSize: 42,
                    color: "#16a34a",
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* TRANSACTIONS */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 5,
              border: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, rgba(59,130,246,0.08), #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                }}>
                Total Transactions
              </Typography>

              <Typography
                variant="h4"
                fontWeight={800}
                mt={1}>
                {filteredPayments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* PAID */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 5,
              border: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, rgba(145,28,139,0.08), #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                }}>
                Paid Payments
              </Typography>

              <Typography
                variant="h4"
                fontWeight={800}
                color="primary.main"
                mt={1}>
                {paidCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FILTERS */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
        }}>
        <Grid container spacing={2}>
          {/* SEARCH */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search by customer or payment ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* FILTER */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>

              <MenuItem value="paid">Paid</MenuItem>

              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
        }}>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow
              sx={{
                background: "#f8fafc",
              }}>
              <TableCell sx={{ fontWeight: 700 }}>#</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Customer
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Order
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Amount
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Status
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Date
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: 700 }}>
                Invoice
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography py={5} color="text.secondary">
                    No payments found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment, index) => (
                <TableRow
                  key={payment.id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      background: "#f9fafb",
                    },
                  }}>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    {payment.order?.user?.name || "N/A"}
                  </TableCell>

                  <TableCell>
                    #{payment.order?.id || "N/A"}
                  </TableCell>

                  <TableCell>
                    <Typography
                      fontWeight={700}
                      sx={{
                        color: "#16a34a",
                      }}>
                      ${payment.amount}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={
                        payment.status === "paid"
                          ? "success"
                          : "warning"
                      }
                      sx={{
                        borderRadius: 1.5,
                        fontWeight: 700,
                        textTransform: "capitalize",
                        px: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      payment.created_at,
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        px: 2.5,
                        boxShadow: "none",

                        "&:hover": {
                          boxShadow: "none",
                        },
                      }}
                      onClick={() =>
                        generateInvoice(payment)
                      }>
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FOOTER */}
      <Divider sx={{ my: 5 }} />

      <Typography
        align="center"
        color="text.secondary"
        variant="body2"
        sx={{
          fontWeight: 500,
        }}>
        Delivery System Finance & Invoice Management
      </Typography>
    </Box>
  );
}