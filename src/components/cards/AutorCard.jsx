import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AutorCard({ autor, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "14px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        transition: "0.25s",
        maxWidth: 260,
        mx: "auto",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* IMAGEN */}
      <CardMedia
        component="img"
        height="170"
        image={
          autor.imagen_url ||
          "https://via.placeholder.com/300x400?text=Autor"
        }
        alt={`${autor.nombres} ${autor.apellidos}`}
      />

      <CardContent sx={{ p: 2 }}>
        {/* NOMBRE */}
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {autor.nombres} {autor.apellidos}
        </Typography>

        {/* NACIONALIDAD */}
        <Typography variant="body2" color="text.secondary">
          {autor.nacionalidad || "Nacionalidad no definida"}
        </Typography>

        {/* BIO CORTA */}
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: "0.8rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {autor.biografia || "Sin biografía"}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* BOTONES */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            onClick={() => navigate(`/autores/${autor.id}`)}
          >
            Ver Detalles
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => navigate(`/autores/${autor.id}/obras`)}
          >
            Ver Obras
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
