import React, { useEffect, useMemo, useState } from "react";

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
  Stack,
  TextField,
  MenuItem,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material";

import { Search, Add } from "@mui/icons-material";

import API from "../../api/axios";
import { useModal } from "../../context/ModalContext";

export default function Users() {
  const { showModal, closeModal } = useModal();

  const [users, setUsers] = useState([]);

  /* =========================================
     FILTERS
  ========================================= */

  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* =========================================
     FETCH USERS
  ========================================= */

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =========================================
     FILTERED USERS
  ========================================= */

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;

      const matchesSearch =
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());

      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, search]);

  /* =========================================
     ROLE COLORS
  ========================================= */

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "error";

      case "manager":
        return "secondary";

      case "driver":
        return "info";

      case "finance":
        return "success";

      case "customer":
        return "default";

      default:
        return "default";
    }
  };

  /* =========================================
     ROLE LEGEND
  ========================================= */

  const roleLegend = [
    {
      label: "Admin",
      value: "admin",
    },

    {
      label: "Manager",
      value: "manager",
    },

    {
      label: "Driver",
      value: "driver",
    },

    {
      label: "Finance",
      value: "finance",
    },

    {
      label: "Customer",
      value: "customer",
    },
  ];

  /* =========================================
     ADD USER MODAL
  ========================================= */

  const openAddModal = () => {
    const AddUserForm = () => {
      const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "customer",
        password: "",
        vehicle_type: "",
        license_number: "",
      });

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const handleAdd = async () => {
        try {
          await API.post("/admin/users", form);

          fetchUsers();

          closeModal();
        } catch (err) {
          console.error(err.response?.data || err.message);

          alert("Failed to create user");
        }
      };

      return (
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth>
            <MenuItem value="customer">Customer</MenuItem>

            <MenuItem value="driver">Driver</MenuItem>

            <MenuItem value="admin">Admin</MenuItem>

            <MenuItem value="manager">Manager</MenuItem>

            <MenuItem value="finance">Finance</MenuItem>
          </TextField>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          {form.role === "driver" && (
            <>
              <TextField
                label="Vehicle Type"
                name="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="License Number"
                name="license_number"
                value={form.license_number}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={handleAdd}>
              Add User
            </Button>

            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      );
    };

    showModal("Add New User", <AddUserForm />);
  };

  /* =========================================
     DELETE USER
  ========================================= */

  const confirmDelete = (user) => {
    showModal(
      "Delete User",

      <Box>
        <Typography mb={3}>
          Are you sure you want to delete:
          <strong> {user.name}</strong> ?
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await API.delete(`/admin/users/${user.id}`);

                fetchUsers();

                closeModal();
              } catch (err) {
                console.error(err);
              }
            }}>
            Delete
          </Button>

          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
        </Stack>
      </Box>,
    );
  };

  /* =========================================
     EDIT USER MODAL
  ========================================= */

  const openEditModal = (user) => {
    const UserEditForm = () => {
      const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "customer",
        password: "",
        vehicle_type: user.driver?.vehicle_type || "",
        license_number: user.driver?.license_number || "",
      });

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const handleUpdate = async () => {
        try {
          await API.put(`/admin/users/${user.id}`, form);

          fetchUsers();

          closeModal();
        } catch (err) {
          console.error(err.response?.data || err.message);
        }
      };

      return (
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth>
            <MenuItem value="customer">Customer</MenuItem>

            <MenuItem value="driver">Driver</MenuItem>

            <MenuItem value="admin">Admin</MenuItem>

            <MenuItem value="manager">Manager</MenuItem>

            <MenuItem value="finance">Finance</MenuItem>
          </TextField>

          <TextField
            label="Password (optional)"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          {form.role === "driver" && (
            <>
              <TextField
                label="Vehicle Type"
                name="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="License Number"
                name="license_number"
                value={form.license_number}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>

            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      );
    };

    showModal(`Edit User - ${user.name}`, <UserEditForm />);
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
      }}>
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #eee",
          background: "#fafafa",
        }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}>
          {/* LEFT */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Users Management
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Total Users: {filteredUsers.length}
            </Typography>

            {/* ROLE LEGEND */}
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              flexWrap="wrap"
              alignItems="center">
              <Typography
                variant="body2"
                fontWeight="bold"
                color="text.secondary">
                Roles:
              </Typography>

              {roleLegend.map((item) => (
                <Chip
                  key={item.value}
                  label={item.label}
                  color={getRoleColor(item.value)}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* FILTERS */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* ADD USER BUTTON */}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={openAddModal}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}>
              Add User
            </Button>

            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            {/* ROLE FILTER */}
            <TextField
              select
              size="small"
              label="Filter Role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              sx={{ minWidth: 180 }}>
              <MenuItem value="all">All Roles</MenuItem>

              <MenuItem value="admin">Admin</MenuItem>

              <MenuItem value="customer">Customer</MenuItem>

              <MenuItem value="driver">Driver</MenuItem>

              <MenuItem value="manager">Manager</MenuItem>

              <MenuItem value="finance">Finance</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </Box>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>#</TableCell>

            <TableCell>Name</TableCell>

            <TableCell>Email</TableCell>

            <TableCell>Phone</TableCell>

            <TableCell>Role</TableCell>

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredUsers.map((u, index) => (
            <TableRow
              key={u.id}
              hover
              sx={{
                backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",

                transition: "0.2s",

                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
              }}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <Typography fontWeight="600">{u.name}</Typography>
              </TableCell>

              <TableCell>{u.email}</TableCell>

              <TableCell>{u.phone || "-"}</TableCell>

              <TableCell>
                <Chip
                  label={u.role}
                  color={getRoleColor(u.role)}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    minWidth: 80,
                  }}
                />
              </TableCell>

              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => openEditModal(u)}>
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => confirmDelete(u)}>
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}

          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography py={3} color="text.secondary">
                  No users found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
