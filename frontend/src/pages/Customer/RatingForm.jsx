import React, { useState } from "react";

import {
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Rating,
} from "@mui/material";

import API from "../../api/axios";

import { useSnackbar } from "../../context/SnackbarContext";

export default function RatingForm({ order, onClose, onSuccess }) {
  const { showSnackbar } = useSnackbar();

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      await API.post("/customer/rate", {
        order_id: order.id,
        driver_id: order.delivery?.driver_id,
        rating,
        comment,
      });

      showSnackbar("Rating submitted successfully", "success");

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      console.error(err);

      showSnackbar("Failed to submit rating", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Stack spacing={3}>
        {/* DRIVER */}
        <Box>
          <Typography variant="h6" fontWeight={700} color="#111827">
            Driver Rating
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Share your delivery experience
          </Typography>
        </Box>

        {/* STARS */}
        <Box>
          <Typography fontWeight={600} mb={1}>
            Rating
          </Typography>

          <Rating
            value={rating}
            size="large"
            onChange={(e, value) => {
              setRating(value);
            }}
          />
        </Box>

        {/* COMMENT */}
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          fullWidth
        />

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
            color="success"
            onClick={submit}
            disabled={loading}
            sx={{
              borderRadius: 2,

              textTransform: "none",

              fontWeight: 700,

              px: 3,

              boxShadow: "none",
            }}>
            Submit Rating
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
