import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Typography, Stack, Paper, MenuItem, } from "@mui/material";
import { obtenerLibros } from "../../Services/libros_service";
import { obtenerReservaPorId, actualizarReserva, } from "../../Services/reservas_service";

export default function ReservaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [reserva, setReserva] = useState({
    libro: "",
    usuario: "",
    fecha_reserva: "",
    fecha_devolucion: "",
  });

  //  Protección básica
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);

  //  Cargar libros
  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await obtenerLibros();
        setLibros(data);
      } catch (error) {
        console.error("Error al cargar libros", error);
      }
    };
    cargarLibros();
  }, []);

  // 📌 Cargar reserva por ID
  useEffect(() => {
    const cargarReserva = async () => {
      try {
        const data = await obtenerReservaPorId(id);

        setReserva({
          libro: data.libro,
          usuario: data.usuario,
          fecha_reserva: data.fecha_reserva,
          fecha_devolucion: data.fecha_devolucion,
        });

        setCargando(false);
      } catch (error) {
        console.error("Error al cargar reserva", error);
      }
    };

    cargarReserva();
  }, [id]);

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actualizarReserva(id, reserva);
      alert("Reserva actualizada con éxito");
      navigate("/reservas");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la reserva");
    }
  };

  if (cargando) {
    return (
      <Box sx={{ pt: 10, textAlign: "center" }}>
        <Typography>Cargando reserva...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 10, minHeight: "100vh", bgcolor: "#f0f0f0" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: "20px" }}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Editar Reserva
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
                Guardar Cambios
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
