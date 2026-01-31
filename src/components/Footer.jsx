import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        bgcolor: "#1a1a1a",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © 2026 – Proyecto Librería
      </Typography>
    </Box>
  );
}
