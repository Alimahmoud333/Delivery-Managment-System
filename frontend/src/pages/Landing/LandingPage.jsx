import React from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  Chip,
} from "@mui/material";

import { Link } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import { lightTheme } from "../../theme/theme";

import Navbar from "../../components/navigation/Navbar";

import GradientButton from "../../components/common/GradientButton";

import { useTheme } from "@mui/material/styles";

import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import landing from "../../assets/images/bggg.png";

const features = [
  {
    title: "Secure Role Access",
    description:
      "Protected access for customers, drivers, managers, finance teams, and administrators.",
    icon: <SecurityRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#7c3aed",
  },

  {
    title: "Smart Delivery Tracking",
    description:
      "Track deliveries, order progress, and driver activity in real time.",
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#059669",
  },

  {
    title: "Support Workflow",
    description:
      "Handle customer support and requests using a clean and organized dashboard.",
    icon: <SupportAgentRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#2563eb",
  },

  {
    title: "Analytics Dashboard",
    description:
      "View statistics, revenue reports, and delivery performance instantly.",
    icon: <AnalyticsRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#ea580c",
  },

  {
    title: "Notifications System",
    description:
      "Receive live alerts for payments, deliveries, and important updates.",
    icon: <NotificationsActiveRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#db2777",
  },

  {
    title: "Responsive Experience",
    description: "Optimized UI for mobile, tablet, and desktop devices.",
    icon: <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />,
    color: "#4f46e5",
  },
];

const steps = [
  "Create Your Account",
  "Place Or Manage Orders",
  "Track Delivery Progress",
  "Receive Notifications",
];

const testimonials = [
  {
    name: "Sarah",
    role: "Business Owner",
    feedback:
      "The platform helped us organize deliveries and reduce management time dramatically.",
  },

  {
    name: "Ahmed",
    role: "Operations Manager",
    feedback:
      "Analytics and delivery tracking are fast, modern, and very easy to use.",
  },

  {
    name: "Maria",
    role: "Customer Support",
    feedback:
      "The clean dashboard and messaging system improved our workflow a lot.",
  },
];

export default function LandingPage() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom, #f8fafc 0%, #ffffff 40%, #f3f4f6 100%)",
        }}>
        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: "92vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `
              linear-gradient(
                rgba(15, 23, 42, 0.80),
                rgba(15, 23, 42, 0.85)
              ),
              url(${landing})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            px: 3,
          }}>
          {/* OVERLAY BLUR */}
          <Box
            sx={{
              position: "absolute",
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)",
              top: -120,
              right: -120,
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Grid container spacing={6} alignItems="center">
              {/* LEFT */}
              <Grid item xs={12} md={7}>
                <Chip
                  label="Modern Delivery Platform"
                  sx={{
                    mb: 3,
                    px: 1,
                    py: 2.2,
                    fontWeight: "bold",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.8rem", md: "5rem" },
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1.1,
                    mb: 3,
                    letterSpacing: "-2px",
                  }}>
                  Delivery
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background:
                        "linear-gradient(90deg,#c084fc,#60a5fa,#34d399)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    Management System
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.1rem",
                    lineHeight: 1.9,
                    maxWidth: 700,
                    mb: 5,
                  }}>
                  Manage deliveries, payments, customers, drivers,
                  notifications, analytics, and support operations inside one
                  intelligent and beautifully designed platform.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <GradientButton
                    component={Link}
                    to="/register"
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: "1rem",
                    }}>
                    Get Started
                  </GradientButton>

                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: "bold",
                      borderWidth: 2,
                      borderColor: "#fff",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      "&:hover": {
                        borderWidth: 2,
                        borderColor: "#fff",
                        backgroundColor: "rgba(255,255,255,0.12)",
                      },
                    }}>
                    Sign In
                  </Button>
                </Stack>

                {/* STATS */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={4}
                  sx={{ mt: 7 }}>
                  {[
                    { number: "24/7", label: "Support" },
                    { number: "99%", label: "Delivery Accuracy" },
                    { number: "100+", label: "Daily Orders" },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "2rem",
                          fontWeight: 900,
                        }}>
                        {item.number}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                        }}>
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              {/* RIGHT */}
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 6,
                    p: 4,
                    boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
                  }}>
                  <Stack spacing={3}>
                    {[
                      "Live order tracking",
                      "Stripe payment integration",
                      "Driver workflow management",
                      "Role-based dashboards",
                      "Notifications & messaging",
                    ].map((text) => (
                      <Stack
                        key={text}
                        direction="row"
                        spacing={2}
                        alignItems="center">
                        <CheckCircleRoundedIcon
                          sx={{
                            color: "#4ade80",
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 500,
                          }}>
                          {text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* FEATURES */}
        {/* <Container sx={{ py: 14 }}> 
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 2,
                color: "#111827",
              }}>
              Powerful Features
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.9,
              }}>
              Everything you need to manage orders, drivers, payments,
              notifications, and customer operations efficiently.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 6,
                    background: "#fff",
                    boxShadow: "0 8px 40px rgba(15,23,42,0.08)",
                    transition: "0.35s",
                    border: "1px solid #f3f4f6",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 18px 50px rgba(15,23,42,0.14)",
                    },
                  }}>
                  <Avatar
                    sx={{
                      width: 75,
                      height: 75,
                      mb: 3,
                      background: `${item.color}15`,
                      color: item.color,
                    }}>
                    {item.icon}
                  </Avatar>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: "#111827",
                    }}>
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      lineHeight: 1.8,
                    }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

       
        <Box
          sx={{
            py: 14,
            background:
              "linear-gradient(to right, #111827 0%, #1f2937 100%)",
          }}>
          <Container>
            <Typography
              variant="h3"
              align="center"
              sx={{
                color: "#fff",
                fontWeight: 900,
                mb: 2,
              }}>
              How It Works
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 8,
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.8,
              }}>
              Start managing deliveries and operations with a simple workflow.
            </Typography>

            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid item xs={12} md={3} key={step}>
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: 5,
                      textAlign: "center",
                      background:
                        "linear-gradient(145deg,#ffffff,#f9fafb)",
                      height: "100%",
                    }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        mx: "auto",
                        mb: 3,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        background:
                          "linear-gradient(135deg,#7c3aed,#2563eb)",
                      }}>
                      {index + 1}
                    </Avatar>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 2,
                      }}>
                      {step}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#6b7280",
                        lineHeight: 1.7,
                      }}>
                      Experience a clean and organized process from account
                      creation to final delivery management.
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container sx={{ py: 14 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: "#111827",
            }}>
            Trusted By Users
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#6b7280",
              mb: 8,
            }}>
            Businesses and teams rely on our platform every day.
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((item) => (
              <Grid item xs={12} md={4} key={item.name}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 6,
                    height: "100%",
                    boxShadow: "0 8px 40px rgba(15,23,42,0.08)",
                  }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        fontWeight: "bold",
                        background:
                          "linear-gradient(135deg,#7c3aed,#2563eb)",
                      }}>
                      {item.name[0]}
                    </Avatar>

                    <Box>
                      <Typography fontWeight="bold">
                        {item.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.9rem",
                        }}>
                        {item.role}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      color: "#4b5563",
                      lineHeight: 1.9,
                    }}>
                    “{item.feedback}”
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box
          sx={{
            py: 14,
            background:
              "linear-gradient(135deg,#7c3aed 0%, #2563eb 100%)",
            textAlign: "center",
            color: "#fff",
            px: 3,
          }}>
          <Container maxWidth="md">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 3,
              }}>
              Ready To Start?
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.9,
                mb: 5,
                fontSize: "1.05rem",
              }}>
              Join the platform today and simplify delivery management,
              customer communication, payments, and analytics with one modern
              solution.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center">
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  color: "#111827",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}>
                Create Account
              </Button>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}>
                Sign In
              </Button>
            </Stack>
          </Container>
        </Box>

      */}

        {/* <Box
          sx={{
            py: 4,
            backgroundColor: "#0f172a",
            textAlign: "center",
          }}>
          <Typography
            sx={{
              color: "#94a3b8",
            }}>
            © {new Date().getFullYear()} Delivery Management System. All rights
            reserved.
          </Typography>
        </Box> 
        */}
      </Box>
    </ThemeProvider>
  );
}
