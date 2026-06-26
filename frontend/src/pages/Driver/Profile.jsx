import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import API from "../../api/axios";

export default function Profile() {
  const [form, setForm] = useState({
    vehicle_type: "",
    license_number: "",
  });

  const submit = async () => {
    await API.post("/driver/update-profile", form);
    alert("Profile Updated");
  };

  return (
    <Stack spacing={2} maxWidth={400}>
      <TextField
        label="Vehicle Type"
        value={form.vehicle_type}
        onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
      />

      <TextField
        label="License Number"
        value={form.license_number}
        onChange={(e) => setForm({ ...form, license_number: e.target.value })}
      />

      <Button variant="contained" onClick={submit}>
        Save
      </Button>
    </Stack>
  );
}
