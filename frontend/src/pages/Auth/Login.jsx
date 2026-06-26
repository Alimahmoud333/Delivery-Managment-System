import {
  Container,
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/navigation/Navbar";
import SectionTitle from "../../components/common/SectionTitle";
import CustomTextField from "../../components/common/CustomTextField";
import GradientButton from "../../components/common/GradientButton";

import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/SnackbarContext";

import { useTheme } from "@mui/material/styles";

export default function Login() {
  const { login } = useAuth();

  const { showSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const theme = useTheme();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const user = await login(form);

      showSnackbar("Login successful", "success");

      navigate(`/${user.role}`);
    } catch (e) {
      /*
      ==================================
      PHONE NOT VERIFIED
      ==================================
      */

      if (e.response?.status === 403) {
        showSnackbar("Please verify your phone number first", "warning");

        navigate("/verify-otp", {
          state: {
            phone: e.response.data.phone,
          },
        });

        return;
      }

      showSnackbar(e.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: theme.customBackgrounds.gradient,
      }}>
      <Navbar />

      <Container
        maxWidth="sm"
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Card
          sx={{
            width: "100%",
            borderRadius: 5,
            boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}>
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
            }}>
            <SectionTitle
              title="Welcome Back"
              subtitle="Enter your credentials to continue"
            />

            <Stack spacing={2.5} mt={4}>
              <CustomTextField
                label="Email"
                value={form.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />

              <CustomTextField
                type="password"
                label="Password"
                value={form.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />

              <GradientButton
                onClick={submit}
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: 3,
                }}>
                Login
              </GradientButton>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>

              <Typography
                component={Link}
                to="/register"
                variant="body2"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 700,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}>
                Register
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
