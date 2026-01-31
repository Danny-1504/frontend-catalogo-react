import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { obtenerReservas, eliminarReserva, editarReserva } from "../Services/ServicioReserva";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [editar, setEditar] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [open, setOpen] = useState(false);

  const cargarReservas = async () => {
    const data = await obtenerReservas();
    setReservas(data);
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
      alert("Reserva actualizada");
      setOpen(false);
      cargarReservas();
    } catch (error) {
      alert("Error al actualizar reserva");
    }
  };

  return (
    <Box sx={{ p: 3, color:"#0022ff" }}>
      <Typography variant="h4" sx={{ mb: 2}}>Reservas</Typography>
      <Grid container spacing={2}>
        {reservas.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <Card>
              <CardContent >
                <Typography>Libro: {r.libro_titulo}</Typography>
                <Typography>Usuario: {r.usuario_nombre}</Typography>
                <Typography>Desde: {r.fecha_inicio}</Typography>
                <Typography>Hasta: {r.fecha_fin}</Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1}}>
                  <Button variant="outlined" onClick={() => handleOpenEditar(r)}>Editar fechas</Button>
                  <Button variant="outlined" color="error" onClick={async () => { 
                    await eliminarReserva(r.id); 
                    cargarReservas();
                  }}>Eliminar</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para editar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar fechas</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField type="date" label="Fecha inicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField type="date" label="Fecha fin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}