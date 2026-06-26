import React, { useEffect, useMemo, useState } from "react";

import {
  Container,
  Typography,
  MenuItem,
  Select,
  Paper,
  Stack,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import API from "../../api/axios";

import SectionTitle from "../../components/common/SectionTitle";

/* =========================================
   MAP STYLE
========================================= */

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "24px",
};

/* =========================================
   COMPONENT
========================================= */

export default function CustomerAddressMap() {
  const [addresses, setAddresses] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState("");

  /* =========================================
     LOAD GOOGLE MAPS
  ========================================= */

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  /* =========================================
     FETCH ADDRESSES
  ========================================= */

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await API.get("/customer/addresses");

        const data = res.data || [];

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, []);

  /* =========================================
     SELECTED ADDRESS
  ========================================= */

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => Number(a.id) === Number(selectedAddressId));
  }, [addresses, selectedAddressId]);

  /* =========================================
     STATES
  ========================================= */

  if (loadError) {
    return (
      <Container maxWidth="md">
        <Paper
          sx={{
            mt: 5,
            p: 5,
            borderRadius: 5,
            textAlign: "center",
          }}>
          <Typography variant="h6" color="error">
            Failed to load Google Maps
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
        }}>
        <CircularProgress />

        <Typography mt={2}>Loading map...</Typography>
      </Box>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <Container maxWidth="lg">
      <SectionTitle title="My Addresses Map"   sx={{
    color: "#fff",

    "& .MuiTypography-root": {
      color: "#fff",
      fontWeight: 800,
    },
  }} />

      {/* =========================================
          SELECT ADDRESS
      ========================================= */}

      <Card
        sx={{
          mt: 4,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* HEADER */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                }}>
                Select Address
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  mt: 1,
                }}>
                Choose an address to view it on the map
              </Typography>
            </Box>

            {/* SELECT */}
            <FormControl fullWidth>
              <InputLabel>Address</InputLabel>

              <Select
                value={selectedAddressId}
                label="Address"
                onChange={(e) => setSelectedAddressId(e.target.value)}
                sx={{
                  borderRadius: 3,
                }}>
                {addresses.length === 0 && (
                  <MenuItem value="">No addresses available</MenuItem>
                )}

                {addresses.map((address) => (
                  <MenuItem key={address.id} value={address.id}>
                    {address.street}, {address.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* ADDRESS INFO */}
            {selectedAddress && (
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(to right, #f0fdf4, #ffffff)",
                  border: "1px solid #dcfce7",
                }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnIcon
                      sx={{
                        color: "#16a34a",
                      }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                      }}>
                      {selectedAddress.city}
                    </Typography>

                    <Chip
                      label="Saved Address"
                      size="small"
                      sx={{
                        borderRadius: 1,
                        background: "#dcfce7",
                        color: "#166534",
                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      color: "#374151",
                      fontWeight: 500,
                    }}>
                    {selectedAddress.street}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                    }}>
                    Latitude: {selectedAddress.lat}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                    }}>
                    Longitude: {selectedAddress.lng}
                  </Typography>
                </Stack>
              </Paper>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* =========================================
          MAP
      ========================================= */}

      {selectedAddress?.lat && selectedAddress?.lng ? (
        <Box
          sx={{
            mt: 4,
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
          }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={{
              lat: parseFloat(selectedAddress.lat),
              lng: parseFloat(selectedAddress.lng),
            }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}>
            <Marker
              position={{
                lat: parseFloat(selectedAddress.lat),
                lng: parseFloat(selectedAddress.lng),
              }}
            />
          </GoogleMap>
        </Box>
      ) : (
        <Paper
          sx={{
            mt: 4,
            p: 6,
            textAlign: "center",
            borderRadius: 5,
            border: "1px dashed #d1d5db",
          }}>
          <Typography
            variant="h6"
            sx={{
              color: "#6b7280",
              fontWeight: 700,
            }}>
            No Location Found
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#9ca3af",
            }}>
            This address does not contain GPS coordinates
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
