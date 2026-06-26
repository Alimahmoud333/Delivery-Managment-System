import React from "react";
import { TextField } from "@mui/material";

function CustomTextField({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  children,
  ...props
}) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value ?? ""}
      onChange={onChange}
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        backgroundColor: "#f5f5f5", // ✅ consistent background color
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#f5f5f5", // ensures inside field matches
        },
      }}
      {...props}>
      {children}
    </TextField>
  );
}

export default CustomTextField;
