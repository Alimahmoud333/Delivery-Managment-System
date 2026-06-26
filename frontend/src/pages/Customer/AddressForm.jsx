import React, { useState, useEffect } from "react";

import {
  Stack,
  Typography,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapIcon from "@mui/icons-material/Map";

import API from "../../api/axios";

import { useSnackbar } from "../../context/SnackbarContext";

import CustomTextField from "../../components/common/CustomTextField";

import { useCustomerDispatch } from "../../context/customerContext";

/* LEAFLET */
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

/* FIX LEAFLET ICON */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AddressForm({ onClose }) {
  const { showSnackbar } = useSnackbar();

  const dispatch = useCustomerDispatch();

  const [loading, setLoading] = useState(false);

  /* =========================================
     LOCATION MODE
  ========================================= */

  const [locationMode, setLocationMode] = useState("current");

  /* =========================================
     FORM
  ========================================= */

  const [form, setForm] = useState({
    city: "",
    street: "",
    lat: 33.8938,
    lng: 35.5018,
  });

  /* =========================================
     GET CURRENT LOCATION
  ========================================= */

  useEffect(() => {
    if (locationMode === "current") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,

            lat: pos.coords.latitude,

            lng: pos.coords.longitude,
          }));
        },

        () => {
          showSnackbar("Location permission denied", "warning");
        },
      );
    }
  }, [locationMode]);

  /* =========================================
     MAP CLICK
  ========================================= */

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setForm((prev) => ({
          ...prev,

          lat: e.latlng.lat,

          lng: e.latlng.lng,
        }));
      },
    });

    return <Marker position={[form.lat, form.lng]} />;
  }

  /* =========================================
     SUBMIT
  ========================================= */
const submit = async () => {
  if (!form.city || !form.street) {
    showSnackbar("Please fill all fields", "warning");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/customer/addresses", form);

    dispatch({
      type: "add_address",
      payload: res.data,
    });

    showSnackbar("Address added successfully", "success");

    onClose();
  } catch (err) {
    console.error(err);

    showSnackbar("Failed to add address", "error");
  } finally {
    setLoading(false);
  }
};

  /* =========================================
     UI
  ========================================= */

  return (
    <Box sx={{ pt: 1 }}>
      <Stack spacing={3}>
        {/* HEADER */}
        <Box>
          <Typography variant="h6" fontWeight={800} color="#111827">
            Add Delivery Address
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Save addresses for future deliveries
          </Typography>
        </Box>

        {/* LOCATION MODE */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 1,

              fontWeight: 700,

              color: "#374151",
            }}>
            Choose Location Method
          </Typography>

          <ToggleButtonGroup
            fullWidth
            exclusive
            value={locationMode}
            onChange={(e, value) => {
              if (value) setLocationMode(value);
            }}>
            {/* CURRENT */}
            <ToggleButton value="current">
              <MyLocationIcon sx={{ mr: 1 }} />
              Current Location
            </ToggleButton>

            {/* MAP */}
            <ToggleButton value="map">
              <MapIcon sx={{ mr: 1 }} />
              Choose From Map
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* CITY */}
        <CustomTextField
          label="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,

              city: e.target.value,
            })
          }
        />

        {/* STREET */}
        <CustomTextField
          label="Street"
          value={form.street}
          onChange={(e) =>
            setForm({
              ...form,

              street: e.target.value,
            })
          }
        />

        {/* MAP */}
        {locationMode === "map" && (
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 1,

                fontWeight: 700,
              }}>
              Click on map to choose exact location
            </Typography>

            <Box
              sx={{
                borderRadius: 4,

                overflow: "hidden",

                border: "1px solid #e5e7eb",
              }}>
              <MapContainer
                center={[form.lat, form.lng]}
                zoom={13}
                style={{
                  height: "350px",

                  width: "100%",
                }}>
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker />
              </MapContainer>
            </Box>
          </Box>
        )}

        {/* LOCATION INFO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: 1,

            background: "#f9fafb",

            border: "1px solid #e5e7eb",

            borderRadius: 3,

            p: 2,
          }}>
          <LocationOnIcon
            sx={{
              color: "#16a34a",
            }}
          />

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#374151",

                fontWeight: 600,
              }}>
              Latitude: {form.lat}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#374151",

                fontWeight: 600,
              }}>
              Longitude: {form.lng}
            </Typography>
          </Box>
        </Box>

        {/* ACTIONS */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: 2,

              textTransform: "none",

              fontWeight: 700,
            }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={submit}
            disabled={loading}
            sx={{
              borderRadius: 2,

              textTransform: "none",

              fontWeight: 700,

              px: 3,

              background: "#16a34a",

              boxShadow: "none",

              "&:hover": {
                background: "#15803d",

                boxShadow: "none",
              },
            }}>
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
