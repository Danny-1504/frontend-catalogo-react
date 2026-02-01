import { useEffect, useState } from "react";
import { obtenerLibros, eliminarLibro } from "../../Services/libros_service";
import LibroCard from "../../components/cards/LibroCard";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,   // 👈 agrega Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarLibros = async () => {
    try {
      setLoading(true);
      const data = await obtenerLibros();
      setLibros(data);
    } catch (error) {
      console.error("Error al obtener libros:", error);
      alert("No se pudieron cargar los libros");
    } finally {
      setLoading(false);
    }
  };

  const onEliminar = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este libro?");
    if (!ok) return;

    try {
      await eliminarLibro(id);
      await cargarLibros();
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      alert("No se pudo eliminar el libro");
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <Box sx={{ px: 3 }}>
      {/* Botón Nuevo Libro bonito */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          component={Link}
          to="/libros/nuevo"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#2e7d32",
            "&:hover": { bgcolor: "#1b5e20" },
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Nuevo libro
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* ✅ GRID DE LIBROS */}
      <Grid container spacing={3}>
        {libros.map((libro) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={libro.id}>
            <LibroCard libro={libro} onEliminar={onEliminar} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListaLibros;