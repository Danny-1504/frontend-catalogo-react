import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { obtenerLibroPorId, eliminarLibro } from "../../Services/libros_service";
import LibroDetalleCard from "../../components/cards/LibroDetalleCard";

const VerLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLogged = !!localStorage.getItem("username");

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      return;
    }

    const cargarLibro = async () => {
      try {
        const data = await obtenerLibroPorId(id);
        setLibro(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el libro");
      } finally {
        setLoading(false);
      }
    };

    cargarLibro();
  }, [id]);

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

  if (!libro) {
    return (
      <Typography align="center" mt={4}>
        Libro no encontrado
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <LibroDetalleCard
        libro={libro}
        isLogged={isLogged}
        onEdit={() => navigate(`/libros/editar/${id}`)}
        onDelete={async () => {
          const ok = window.confirm("¿Seguro que deseas eliminar este libro?");
          if (!ok) return;

          await eliminarLibro(id);
          navigate("/");
        }}
      />
    </Box>
  );
};

export default VerLibro;