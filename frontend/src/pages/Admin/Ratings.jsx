import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import API from "../../api/axios";

export default function Ratings() {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = () => {
    API.get("/admin/ratings").then((res) => setRatings(res.data));
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
        Driver Ratings
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>ID</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((r, index) => (
            <TableRow
              key={r.id}
              sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "white" }}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{r.driver?.user?.name}</TableCell>
              <TableCell>{r.user?.name}</TableCell>
              <TableCell>{r.driver?.user?.phone}</TableCell>
              <TableCell>{r.order_id}</TableCell>
              <TableCell>{r.rating}</TableCell>
              <TableCell>{r.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
