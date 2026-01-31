import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AutorDetalleCard = ({ autor, isLogged, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 4,
        boxShadow: 6,
        overflow: "hidden",
      }}
    >
      {/* CABECERA */}
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image={autor.imagen_url}
          alt={`${autor.nombres} ${autor.apellidos}`}
          sx={{
            width: 280,
            objectFit: "cover",
            bgcolor: "#f5f5f5",
          }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {autor.nombres} {autor.apellidos}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {autor.nacionalidad && (
              <Chip label={`Nacionalidad: ${autor.nacionalidad}`} />
            )}
            {autor.fecha_nacimiento && (
              <Chip label={`Fecha de nacimiento: ${autor.fecha_nacimiento}`} />
            )}
          </Box>

          {/* ACCIONES PROTEGIDAS */}
          {isLogged && (
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEdit}
              >
                Editar
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
              >
                Eliminar
              </Button>
            </Box>
          )}
        </CardContent>
      </Box>

      <Divider />

      {/* BIOGRAFÍA */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Biografía
        </Typography>

        <Typography
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.7,
          }}
        >
          {autor.biografia || "Este autor no tiene biografía registrada."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AutorDetalleCard;
