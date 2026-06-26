import { Box, Typography } from "@mui/material";

export default function SectionTitle({ title, subtitle, sx = {} }) {
  return (
    <Box mb={4} sx={sx}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          color: "inherit",
        }}>
        {title}
      </Typography>

      {subtitle && (
        <Typography
          sx={{
            mt: 1,
            opacity: 0.8,
            color: "inherit",
          }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
