import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { crearAutor } from "../../Services/autores_service";

export default function AutorCrear() {
  const navigate = useNavigate();

  const [autor, setAutor] = useState({
    nombres: "",
    apellidos: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    biografia: "",
    imagen_url: "",
  });

  // 🔐 Protección básica (igual que editar)
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setAutor({
      ...autor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearAutor({
        ...autor,
        fecha_nacimiento: autor.fecha_nacimiento || null,
      });
      navigate("/autores");
    } catch (error) {
      console.error("Error al crear autor", error);
      alert("Error al crear el autor");
    }
  };

  return (
    <Box sx={{ pt: 10, minHeight: "100vh", bgcolor: "#f0f0f0" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: "20px" }}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Crear Autor
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nombres"
                name="nombres"
                value={autor.nombres}
                onChange={handleChange}
                variant="filled"
                required
              />

              <TextField
                fullWidth
                label="Apellidos"
                name="apellidos"
                value={autor.apellidos}
                onChange={handleChange}
                variant="filled"
                required
              />

              <TextField
                fullWidth
                label="Nacionalidad"
                name="nacionalidad"
                value={autor.nacionalidad}
                onChange={handleChange}
                variant="filled"
              />

              <TextField
                fullWidth
                label="Fecha de nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={autor.fecha_nacimiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="filled"
              />

              <TextField
                fullWidth
                label="Biografía"
                name="biografia"
                value={autor.biografia}
                onChange={handleChange}
                multiline
                rows={5}
                variant="filled"
              />

              {/* Imagen */}
              <Stack spacing={1} sx={{ my: 2 }}>
                {autor.imagen_url && (
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={autor.imagen_url}
                      alt="Preview"
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}

                <TextField
                  fullWidth
                  size="small"
                  label="URL de imagen"
                  name="imagen_url"
                  value={autor.imagen_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
              >
                Guardar
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
