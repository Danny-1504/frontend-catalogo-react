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
  MenuItem,
} from "@mui/material";

import { obtenerLibros } from "../../Services/libros_service";
import { crearReserva } from "../../Services/reservas_service";

export default function ReservaCrear() {
  const navigate = useNavigate();

  const [libros, setLibros] = useState([]);

  const [reserva, setReserva] = useState({
    libro: "",
    usuario: "",
    fecha_reserva: "",
    fecha_devolucion: "",
  });

  // 🔐 Protección
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);

  // 📚 Cargar libros
  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const res = await obtenerLibros();
        setLibros(res);
      } catch (error) {
        console.error("Error al cargar libros", error);
      }
    };
    cargarLibros();
  }, []);

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearReserva(reserva);
      alert("Reserva creada con éxito");
      navigate("/reservas");
    } catch (error) {
      console.error(error);
      alert("Error al crear la reserva");
    }
  };

  return (
    <Box sx={{ pt: 10, minHeight: "100vh", bgcolor: "#f0f0f0" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: "20px" }}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Nueva Reserva
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Libro */}
              <TextField
                select
                fullWidth
                label="Libro"
                name="libro"
                value={reserva.libro}
                onChange={handleChange}
                variant="filled"
                required
              >
                {libros.map((libro) => (
                  <MenuItem key={libro.id} value={libro.id}>
                    {libro.titulo}
                  </MenuItem>
                ))}
              </TextField>

              {/* Usuario */}
              <TextField
                fullWidth
                label="Usuario"
                name="usuario"
                value={reserva.usuario}
                onChange={handleChange}
                variant="filled"
                required
              />

              {/* Fecha reserva */}
              <TextField
                fullWidth
                label="Fecha de reserva"
                name="fecha_reserva"
                type="date"
                value={reserva.fecha_reserva}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                required
              />

              {/* Fecha devolución */}
              <TextField
                fullWidth
                label="Fecha de devolución"
                name="fecha_devolucion"
                type="date"
                value={reserva.fecha_devolucion}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                required
              />

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
              >
                Guardar Reserva
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
