import { Card, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";

const LibroDetalleCard = ({ libro, isLogged, onEdit, onDelete }) => {
  return (
    <Card sx={{ display: "flex", p: 2, gap: 2 }}>
      <CardMedia
        component="img"
        image={libro.imagen_url}
        alt={libro.titulo}
        sx={{ width: 200, borderRadius: 2, objectFit: "cover" }}
      />

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          {libro.titulo}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Autor: {libro.autor_nombre || libro.autor?.nombre}
        </Typography>

        {libro.descripcion && (
          <Typography sx={{ mt: 2 }}>
            {libro.descripcion}
          </Typography>
        )}

        {isLogged && (
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" onClick={onEdit}>
              Editar
            </Button>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Eliminar
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default LibroDetalleCard;