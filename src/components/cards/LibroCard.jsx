import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LibroCard = ({ libro }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 190,
        borderRadius: "14px 6px 6px 14px", // efecto lomo de libro
        boxShadow: 5,
        overflow: "hidden",
        backgroundColor: "#fafafa",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      {/* Portada */}
      <CardMedia
        component="img"
        height="260"
        image={libro.imagen_url}
        alt={libro.titulo}
        sx={{ objectFit: "cover" }}
      />

      {/* Info */}
      <CardContent sx={{ textAlign: "center", py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {libro.titulo}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          {libro.autor_nombre}
        </Typography>

        <Button
          size="small"
          sx={{ mt: 1 }}
          onClick={() => navigate(`/libros/${libro.id}`)}
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default LibroCard;
