import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/navigation/Navbar";
import SectionTitle from "../../components/common/SectionTitle";
import CustomTextField from "../../components/common/CustomTextField";
import GradientButton from "../../components/common/GradientButton";

import { useSnackbar } from "../../context/SnackbarContext";
import API from "../../api/axios";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const { showSnackbar } = useSnackbar();

  const phone = state?.phone || "";

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!code) {
      showSnackbar("Please enter OTP code", "warning");
      return;
    }

    try {
      setLoading(true);

      await API.post("/verify-otp", {
        phone,
        code,
      });

      showSnackbar(
        "Phone verified successfully",
        "success"
      );

      navigate("/login");
    } catch (error) {
      showSnackbar(
        error.response?.data?.message ||
          "Invalid verification code",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      await API.post("/send-otp", {
        phone,
      });

      showSnackbar(
        "Verification code sent again",
        "success"
      );
    } catch (error) {
      showSnackbar(
        error.response?.data?.message ||
          "Failed to resend code",
        "error"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
      }}
    >
      <Navbar />

      <Container
        maxWidth="sm"
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            <SectionTitle
              title="Verify Phone Number"
              subtitle="Enter the verification code sent to your phone"
            />

            <Typography
              textAlign="center"
              sx={{
                mt: 2,
                mb: 4,
                color: "text.secondary",
              }}
            >
              {phone}
            </Typography>

            <Stack spacing={3}>
              <CustomTextField
                label="OTP Code"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                fullWidth
                placeholder="123456"
              />

              <GradientButton
                fullWidth
                onClick={submit}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                }}
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </GradientButton>

              <Typography
                textAlign="center"
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  fontWeight: 600,
                }}
                onClick={resendCode}
              >
                Resend Code
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}