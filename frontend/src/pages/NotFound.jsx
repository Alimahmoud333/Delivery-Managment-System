import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

import notfound from "../assets/images/notfound.png";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #eef2ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
        }}>
        {/* TOP BAR */}
        <Box
          sx={{
            height: 10,
            background: "linear-gradient(to right, #2563eb, #22c55e)",
          }}
        />

        {/* CONTENT */}
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
          }}>
          {/* ICON */}
          <Box
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 3,
              borderRadius: "50%",
              background: "rgba(37,99,235,0.08)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <LocalShippingRoundedIcon
              sx={{
                fontSize: 46,
                color: "#2563eb",
              }}
            />
          </Box>

          {/* IMAGE */}
          <Box
            component="img"
            src={notfound}
            alt="Not Found"
            sx={{
              width: "100%",
              maxWidth: 320,
              objectFit: "contain",
              mb: 4,
              filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.12))",
            }}
          />

          {/* 404 */}
          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "4rem",
                md: "5.5rem",
              },
              lineHeight: 1,
              color: "#111827",
              mb: 1,
            }}>
            404
          </Typography>

          {/* TITLE */}
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "#1f2937",
              mb: 2,
            }}>
            Delivery Page Not Found
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              color: "#6b7280",
              maxWidth: 500,
              mx: "auto",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              mb: 4,
            }}>
            Oops! Our delivery driver searched everywhere but could not find the
            page you are looking for. Please check the URL or return safely to
            the homepage.
          </Typography>

          {/* BUTTON */}
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeRoundedIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 4,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 10px 25px rgba(37,99,235,0.25)",

              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 14px 30px rgba(37,99,235,0.35)",
              },

              transition: "0.3s",
            }}>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
