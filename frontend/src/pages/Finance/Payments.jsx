// ==============================================
// PAYMENTS.jsx
// ==============================================

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  Divider,
} from "@mui/material";

import API from "../../api/axios";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API.get("/finance/payments").then((res) => setPayments(res.data));
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Payments
        </Typography>

        <Typography color="text.secondary">
          Manage all payment transactions
        </Typography>
      </Box>

      {payments.map((p, index) => (
        <Card
          key={p.id}
          sx={{
            borderRadius: 5,
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            transition: "0.3s",

            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}>
          <CardContent sx={{ p: 3 }}>
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ color: "#111827" }}>
                  Payment {index + 1}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    mt: 0.5,
                  }}>
                  Transaction ID: {p.id}
                </Typography>
              </Box>

              <Chip
                label={p.status}
                color={p.status === "paid" ? "success" : "warning"}
                sx={{
                  borderRadius: 1.5,
                  px: 1,
                  fontWeight: 700,
                  textTransform: "capitalize",
                }}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              <Typography fontWeight={600}>
                💰 Amount:
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    color: "#16a34a",
                    fontWeight: 800,
                  }}>
                  ${p.amount}
                </Box>
              </Typography>

              <Typography fontWeight={500}>
                👤 User:
                <Box component="span" sx={{ ml: 1 }}>
                  {p.order?.user?.name}
                </Box>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}