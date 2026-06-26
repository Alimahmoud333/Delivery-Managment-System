import React, { useMemo } from "react";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"];

export default function AddressMap({ address, onBack }) {
  const { city, street, lat, lng } = address;

  /* =========================================
     LOAD GOOGLE MAP
  ========================================= */

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /* =========================================
     STATES
  ========================================= */

  const [directions, setDirections] = React.useState(null);

  const [distance, setDistance] = React.useState("");

  const [duration, setDuration] = React.useState("");

  /* =========================================
     DESTINATION
  ========================================= */

  const destination = useMemo(() => {
    return {
      lat: Number(lat),
      lng: Number(lng),
    };
  }, [lat, lng]);

  /* =========================================
     GET USER LOCATION + ROUTE
  ========================================= */

  React.useEffect(() => {
    if (!isLoaded) return;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const directionsService =
          new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);

              const leg = result.routes[0].legs[0];

              setDistance(leg.distance.text);

              setDuration(leg.duration.text);
            } else {
              console.error("Directions request failed:", status);
            }
          }
        );
      },
      (error) => {
        console.error(error);

        alert("Please allow location access");
      }
    );
  }, [isLoaded, destination]);

  /* =========================================
     ERRORS
  ========================================= */

  if (loadError)
    return (
      <Typography color="error">
        Google Map cannot be loaded
      </Typography>
    );

  if (!isLoaded)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}>
        <CircularProgress />
      </Box>
    );

  /* =========================================
     UI
  ========================================= */

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
          }}>
          Back
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<RouteIcon />}
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
          }}>
          Open in Google Maps
        </Button>
      </Stack>

      {/* INFO CARD */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}>
        <CardContent>
          <Stack spacing={2}>
            {/* ADDRESS */}
            <Stack direction="row" spacing={1} alignItems="center">
              <PlaceIcon color="error" />

              <Box>
                <Typography fontWeight={800}>
                  Destination
                </Typography>

                <Typography color="text.secondary">
                  {street}, {city}
                </Typography>
              </Box>
            </Stack>

            {/* DISTANCE + TIME */}
            <Stack direction="row" spacing={2}>
              <Chip
                icon={<RouteIcon />}
                label={`Distance: ${distance || "Calculating..."}`}
                color="primary"
                sx={{
                  fontWeight: 700,
                  px: 1,
                }}
              />

              <Chip
                icon={<AccessTimeIcon />}
                label={`Duration: ${duration || "Calculating..."}`}
                color="success"
                sx={{
                  fontWeight: 700,
                  px: 1,
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* MAP */}
      <Card
        sx={{
          overflow: "hidden",
          borderRadius: 5,
          border: "1px solid #e5e7eb",
        }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={destination}
          zoom={14}>
          {/* DESTINATION MARKER */}
          <Marker position={destination} />

          {/* ROUTE */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
            />
          )}
        </GoogleMap>
      </Card>
    </Box>
  );
}