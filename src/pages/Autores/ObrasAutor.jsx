import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { obtenerLibrosPorAutor } from "../../Services/libros_service";
import LibroCard from "../../components/cards/LibroCard";

const ObrasAutor = () => {
  const { id } = useParams();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await obtenerLibrosPorAutor(id);
        setLibros(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las obras del autor");
      } finally {
        setLoading(false);
      }
    };

    cargarLibros();
  }, [id]);

  if (loading) return <Typography>Cargando obras...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Obras del autor
      </Typography>
      
      {libros.length === 0 ? (
        <Typography mt={3}>
          Este autor no tiene libros registrados.
        </Typography>
      ) : (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {libros.map((libro) => (
            <LibroCard key={libro.id} libro={libro} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ObrasAutor;
