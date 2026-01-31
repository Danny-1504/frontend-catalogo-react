import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import AutorDetalleCard from "../../components/cards/AutorDetalleCard";
import { obtenerAutoresPorId, eliminarAutor } from "../../Services/autores_service";

const AutorDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLogged = !!localStorage.getItem("username");

  useEffect(() => {
    const cargarAutor = async () => {
      try {
        const data = await obtenerAutoresPorId(id);
        setAutor(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del autor");
      } finally {
        setLoading(false);
      }
    };

    cargarAutor();
  }, [id]);

  const handleDelete = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de eliminar este autor?\nEsta acción no se puede deshacer."
    );
    if (!confirmacion) return;

    try {
      await eliminarAutor(id);
      navigate("/autores");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el autor");
    }
  };

  const handleEdit = () => {
    navigate(`/autores/editar/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 4, py: 4 }}>
      {/* Volver */}
      

      {/* Card del autor */}
      <AutorDetalleCard
        autor={autor}
        isLogged={isLogged}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default AutorDetalle;
