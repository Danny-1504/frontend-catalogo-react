import { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { obtenerLibroPorId } from "../../Services/ServicioLibro";
import { crearReserva } from "../../Services/ServicioReserva";

export default function LibroDetallePage() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reservado, setReservado] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await obtenerLibroPorId(id);
      setLibro(data);
      // Aquí podrías verificar si ya está reservado y setear reservado=true
    })();
  }, [id]);

  const handleReservar = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Selecciona fechas de inicio y fin");
      return;
    }
    try {
      await crearReserva(libro.id, fechaInicio, fechaFin);
      alert("Libro reservado");
      setReservado(true);
    } catch (error) {
      alert("Error al reservar el libro");
    }
  };

  if (!libro) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ width: "100%", px: 4,color:"#000000" }}>
      <Typography variant="h3">{libro.titulo}</Typography>
      <Typography variant="h5">Autor: {libro.autor_nombre || libro.autor}</Typography>
      <Typography variant="body1">Estado: {reservado ? "Reservado" : "Disponible"}</Typography>
      {libro.imagen && (
        <img src={libro.imagen.startsWith("http") ? libro.imagen : `http://127.0.0.1:8000${libro.imagen}`} 
             alt={libro.titulo} style={{ maxWidth: "300px", marginTop: "16px" }} />
      )}

      {!reservado && (
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <TextField
            type="date"
            label="Fecha inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="Fecha fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleReservar}>Reservar</Button>
        </Box>
      )}
    </Box>
  );
}