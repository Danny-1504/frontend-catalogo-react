import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from "@mui/material";
import { obtenerReservas, eliminarReserva, editarReserva } from "../Services/ServicioReserva";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editar, setEditar] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [open, setOpen] = useState(false);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
      setError("No se pudieron cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleOpenEditar = (reserva) => {
    setEditar(reserva);
    setFechaInicio(reserva.fecha_inicio);
    setFechaFin(reserva.fecha_fin);
    setOpen(true);
  };

  const handleGuardar = async () => {
    try {
      await editarReserva(editar.id, fechaInicio, fechaFin);
      alert("Reserva actualizada correctamente");
      setOpen(false);
      cargarReservas();
    } catch (error) {
      alert("Error al actualizar reserva: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta reserva?")) {
      try {
        await eliminarReserva(id);
        alert("Reserva eliminada correctamente");
        cargarReservas();
      } catch (error) {
        alert("Error al eliminar reserva: " + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={cargarReservas} sx={{ mt: 2 }}>
          Reintentar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#000", fontWeight: "bold" }}>
        📚 Mis Reservas
      </Typography>

      {reservas.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
            No tienes reservas activas
          </Typography>
          <Typography variant="body1" sx={{ color: "#888" }}>
            ¡Comienza reservando un libro desde el catálogo!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {reservas.map((r) => (
            <Grid item key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card 
                sx={{ 
                  bgcolor: "#ffffff", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: "#1a237e", 
                      fontWeight: "bold",
                      mb: 2,
                      borderBottom: "1px solid #eee",
                      pb: 1
                    }}
                  >
                    {r.libro_titulo || `Libro ID: ${r.libro_id}`}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ color: "#333", mb: 1 }}>
                      <strong>👤 Usuario:</strong> {r.usuario_nombre || "No especificado"}
                    </Typography>
                    <Typography sx={{ color: "#333", mb: 1 }}>
                      <strong>📅 Fecha de reserva:</strong> {r.fecha_inicio}
                    </Typography>
                    <Typography sx={{ color: "#333", mb: 1 }}>
                      <strong>📅 Fecha de devolución:</strong> {r.fecha_fin}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleOpenEditar(r)}
                      sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        '&:hover': {
                          borderColor: "#115293",
                          backgroundColor: "rgba(25, 118, 210, 0.04)"
                        }
                      }}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => handleEliminar(r.id)}
                      sx={{
                        borderColor: "#d32f2f",
                        color: "#d32f2f",
                        '&:hover': {
                          borderColor: "#9a0007",
                          backgroundColor: "rgba(211, 47, 47, 0.04)"
                        }
                      }}
                    >
                      🗑️ Eliminar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal para editar fechas */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "#000", fontWeight: "bold", bgcolor: "#f8f9fa" }}>
          ✏️ Editar Fechas de Reserva
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
            <TextField
              type="date"
              label="Fecha de inicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#555' },
                '& .MuiInputBase-input': { color: '#000' }
              }}
            />
            <TextField
              type="date"
              label="Fecha de fin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#555' },
                '& .MuiInputBase-input': { color: '#000' }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setOpen(false)}
            sx={{ color: "#666" }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleGuardar}
            sx={{ 
              bgcolor: "#1976d2",
              '&:hover': { bgcolor: "#115293" }
            }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}