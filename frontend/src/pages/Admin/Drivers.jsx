import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import API from "../../api/axios";

export default function Drivers() {

  
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = () => {
    API.get("/admin/drivers").then((res) => setDrivers(res.data));
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const toggleAvailability = (id) => {
    API.post(`/admin/drivers/${id}/toggle`).then(fetchDrivers);
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
        Drivers Management
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Available</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((d, index) => (
            <TableRow
              key={d.id}
              sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "white" }}>
              <TableCell>{d.id}</TableCell>
              <TableCell>{d.user.name}</TableCell>
              <TableCell>{d.user.email}</TableCell>
              <TableCell>{d.is_available ? "Yes" : "No"}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleAvailability(d.id)}>
                  Toggle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
