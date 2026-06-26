// ==============================================
// FINANCE DASHBOARD.jsx
// ==============================================

import React, { useEffect, useState } from "react";

import { Card, CardContent, Typography, Grid, Box, Stack } from "@mui/material";

import API from "../../api/axios";

import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function Dashboard() {
  const [data, setData] = useState({
    total_revenue: 0,
    total_transactions: 0,
  });

  useEffect(() => {
    API.get("/finance/revenue").then((res) => setData(res.data));
  }, []);

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
          Finance Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontWeight: 500,
          }}>
          Overview of revenue and transactions
        </Typography>
      </Box>

      {/* STATS */}
      <Grid container spacing={3}>
        {/* REVENUE */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, rgba(34,197,94,0.08), #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}>
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                      mb: 1,
                    }}>
                    Total Revenue
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                      color: "#16a34a",
                    }}>
                    ${data.total_revenue}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 4,
                    background: "rgba(34,197,94,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <PaidIcon
                    sx={{
                      fontSize: 38,
                      color: "#16a34a",
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* TRANSACTIONS */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, rgba(59,130,246,0.08), #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}>
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                      mb: 1,
                    }}>
                    Transactions
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                      color: "#2563eb",
                    }}>
                    {data.total_transactions}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 4,
                    background: "rgba(59,130,246,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <ReceiptLongIcon
                    sx={{
                      fontSize: 38,
                      color: "#2563eb",
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
