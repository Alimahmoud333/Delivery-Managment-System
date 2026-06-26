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

export default function Register() {
  const { register } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+961",
    role: "customer", // 👈 always default
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+961")) {
      value = "+961";
    }
    setForm({ ...form, phone: value });
  };

  const validate = () => {
    const newErrors = {};

    // Name: only letters and > 5
    if (!/^[A-Za-z]{6,}$/.test(form.name)) {
      newErrors.name = "Name must be letters only and at least 6 characters.";
    }

    // Email: letters+numbers and must end with @gmail.com
    if (!/^[A-Za-z0-9]+@gmail\.com$/.test(form.email)) {
      newErrors.email = "Email must be like ali1234@gmail.com.";
    }

    // Phone: Lebanese format +961 followed by 8 digits
    if (!/^\+961\d{8}$/.test(form.phone)) {
      newErrors.phone = "Phone must be Lebanese format (+961XXXXXXXX).";
    }

    // Password: >7 chars, contains letters and numbers
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    }

    // Confirm password
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      showSnackbar("Please fix the errors before submitting", "error");
      return;
    }

    try {
      const res = await register(form);
      showSnackbar("Verification code sent to your phone", "success");
      navigate("/verify-otp", { state: { phone: res.phone } });
    } catch (e) {
      showSnackbar(e.response?.data?.message || "Registration failed", "error");
    }
  };

  return (
    <Box minHeight="100vh">
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card>
          <CardContent>
            <SectionTitle title="Create Account" />
            <Stack spacing={2}>
              <CustomTextField
                label="Name"
                value={form.name}
                onChange={handleChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
              <CustomTextField
                label="Email"
                value={form.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
              <CustomTextField
                label="Phone"
                value={form.phone}
                onChange={handlePhoneChange}
                error={!!errors.phone}
                helperText={errors.phone}
                placeholder="+96170123456"
                fullWidth
              />
              {/* Role hidden */}
              <input type="hidden" value="customer" />
              <CustomTextField
                type="password"
                label="Password"
                value={form.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
              <CustomTextField
                type="password"
                label="Confirm Password"
                value={form.password_confirmation}
                onChange={handleChange("password_confirmation")}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation}
                fullWidth
              />
              <GradientButton fullWidth onClick={submit}>
                Register
              </GradientButton>
            </Stack>
            <Stack direction="row" justifyContent="center" mt={3}>
              <Typography mr={1}>Already have account?</Typography>
              <Typography component={Link} to="/login">
                Login
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
