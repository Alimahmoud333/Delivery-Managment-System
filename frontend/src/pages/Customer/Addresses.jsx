import React, { useEffect } from "react";

import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  Box,
  Chip,
} from "@mui/material";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import API from "../../api/axios";

import AddressForm from "./AddressForm";

import SectionTitle from "../../components/common/SectionTitle";

import {
  useCustomer,
  useCustomerDispatch,
} from "../../context/customerContext";

import { useModal } from "../../context/ModalContext";

export default function Addresses() {
  const { addresses } = useCustomer();

  const dispatch = useCustomerDispatch();

  const { showModal, closeModal } = useModal();

  /* =========================================
     FETCH ADDRESSES
  ========================================= */

  useEffect(() => {
    API.get("/customer/addresses").then((res) => {
      dispatch({
        type: "set_addresses",
        payload: res.data,
      });
    });
  }, [dispatch]);

  /* =========================================
     DELETE ADDRESS
  ========================================= */

  const remove = async (id) => {
    dispatch({
      type: "delete_address",
      payload: { id },
    });

    try {
      await API.delete(`/customer/addresses/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================
     OPEN MODAL
  ========================================= */

  const openAddressModal = () => {
    showModal("Add New Address", <AddressForm onClose={closeModal} />);
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <Container maxWidth="lg">
      <SectionTitle title="My Addresses"   sx={{
    color: "#fff",

    "& .MuiTypography-root": {
      color: "#fff",
      fontWeight: 800,
    },
  }} />

      {/* TOP ACTION */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}>
        <Typography
          variant="body1"
          sx={{
            color: "#6b7280",
            fontWeight: 500,
          }}>
          Manage your saved delivery addresses
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddLocationAltIcon />}
          onClick={openAddressModal}
          sx={{
            borderRadius: 2,

            textTransform: "none",

            fontWeight: 700,

            px: 3,

            py: 1.2,

            background: "#16a34a",

            boxShadow: "none",

            "&:hover": {
              background: "#15803d",

              boxShadow: "none",
            },
          }}>
          Add Address
        </Button>
      </Box>

      {/* ADDRESSES */}
      <Grid container spacing={3}>
        {addresses.map((a, index) => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card
              sx={{
                height: "100%",

                borderRadius: 5,

                overflow: "hidden",

                border: "1px solid #e5e7eb",

                background: "linear-gradient(to bottom, #ffffff, #fafafa)",

                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",

                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-5px)",

                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
                },
              }}>
              {/* TOP COLOR */}
              <Box
                sx={{
                  height: 8,

                  background: "linear-gradient(to right, #22c55e, #16a34a)",
                }}
              />

              <CardContent
                sx={{
                  p: 3,
                }}>
                {/* HEADER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,

                      color: "#111827",
                    }}>
                    Address {index + 1}
                  </Typography>

                  <Chip
                    label="Saved"
                    size="small"
                    sx={{
                      borderRadius: 1,

                      fontWeight: 700,

                      background: "#dcfce7",

                      color: "#166534",
                    }}
                  />
                </Stack>

                {/* CITY */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    gap: 1,

                    mb: 2,
                  }}>
                  <LocationOnIcon
                    sx={{
                      color: "#16a34a",
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,

                      color: "#111827",

                      fontSize: "1rem",
                    }}>
                    {a.city}
                  </Typography>
                </Box>

                {/* STREET */}
                <Typography
                  sx={{
                    color: "#4b5563",

                    fontWeight: 500,

                    lineHeight: 1.7,

                    minHeight: 50,
                  }}>
                  {a.street}
                </Typography>

                {/* FOOTER */}
                <Box mt={4} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => remove(a.id)}
                    sx={{
                      borderRadius: 2,

                      textTransform: "none",

                      fontWeight: 700,

                      px: 2.5,

                      boxShadow: "none",

                      "&:hover": {
                        boxShadow: "none",
                      },
                    }}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* EMPTY */}
        {addresses.length === 0 && (
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 5,

                textAlign: "center",

                p: 6,

                border: "1px dashed #d1d5db",

                background: "#fafafa",
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,

                  color: "#6b7280",
                }}>
                No Addresses Found
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  color: "#9ca3af",
                }}>
                Add your first delivery address
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
