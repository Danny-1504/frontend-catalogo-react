import { useEffect, useState } from "react";
import { obtenerReservas } from "../../Services/reservas_service";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { eliminarReserva } from "../../Services/reservas_service";

export default function ListaReservas() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("username");
  };


  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await obtenerReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas", error);
    }
  };

  const navigate = useNavigate();
  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta reserva?"
    );

    if (!confirmar) return;

    try {
      await eliminarReserva(id);
      cargarReservas(); // refresca la tabla
    } catch (error) {
      console.error("Error al eliminar reserva", error);
      alert("No se pudo eliminar la reserva");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Reservas
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Libro</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Fecha de reserva</TableCell>
              <TableCell>Fecha de devolucion</TableCell>
              <TableCell align="center">Acciones</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell>{reserva.id}</TableCell>
                <TableCell>{reserva.libro_nombre}</TableCell>
                <TableCell>{reserva.usuario}</TableCell>
                <TableCell>{reserva.fecha_reserva}</TableCell>
                <TableCell>{reserva.fecha_devolucion}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/reservas/editar/${reserva.id}`)}
                  >
                    Editar
                  </Button>
                  {isAuthenticated() && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleEliminar(reserva.id)}
                  >
                    Eliminar
                  </Button> )}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
