// components/common/GradientButton.jsx
import { Button } from "@mui/material";

export default function GradientButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        mt: 3,
        py: 1.2,
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: 2,
        backgroundImage: "linear-gradient(to right, #4a148c, #880e4f)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        border:"1px solid white"
      }}
      {...props}>
      {children}
    </Button>
  );
}
