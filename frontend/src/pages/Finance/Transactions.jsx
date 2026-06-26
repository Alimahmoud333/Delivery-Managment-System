// ==============================================
// TRANSACTIONS.jsx
// ==============================================

import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  Chip,
  TableContainer,
} from "@mui/material";

import API from "../../api/axios";

export default function Transactions() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API.get("/finance/payments").then((res) => setPayments(res.data));
  }, []);

  return (
    <Box>
      {/* HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={800}>
          Transactions
        </Typography>

        <Typography color="text.secondary">
          All payment transactions overview
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow
              sx={{
                background: "#f8fafc",
              }}>
              <TableCell sx={{ fontWeight: 700 }}>#</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {payments.map((p, index) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  transition: "0.2s",

                  "&:hover": {
                    background: "#f9fafb",
                  },
                }}>
                <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>

                <TableCell>{p.order?.user?.name}</TableCell>

                <TableCell>
                  <Typography
                    fontWeight={700}
                    sx={{
                      color: "#16a34a",
                    }}>
                    ${p.amount}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={p.status}
                    color={p.status === "paid" ? "success" : "warning"}
                    sx={{
                      borderRadius: 1.5,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography py={4} color="text.secondary">
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
