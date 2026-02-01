import { useEffect, useState } from "react";
import { obtenerLibros, eliminarLibro } from "../../Services/libros_service";
import LibroCard from "../../components/cards/LibroCard";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,   // Grid responsivo
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListaLibros = () => {
  // Estados para almacenar la lista de libros y controlar la carga
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para cargar los libros desde la API
  const cargarLibros = async () => {
    try {
      setLoading(true); // Activar estado de carga
      const data = await obtenerLibros(); // Llamar al servicio
      setLibros(data); // Actualizar estado con los libros obtenidos
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudieron cargar los libros");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  // Función para eliminar un libro
  const onEliminar = async (id) => {
    // Pedir confirmación antes de eliminar
    const ok = window.confirm("¿Eliminar libro?");
    if (!ok) return; // Cancelar si no se confirma

    try {
      await eliminarLibro(id); // Llamar al servicio de eliminación
      await cargarLibros(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo eliminar");
    }
  };

  // Cargar los libros al montar el componente
  useEffect(() => {
    cargarLibros();
  }, []); // El array vacío asegura que solo se ejecute una vez

  return (
    <Box sx={{ px: 3 }}>
      {/* Contenedor para el botón de nuevo libro */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          component={Link} // Convierte el botón en un enlace
          to="/libros/nuevo" // Ruta a la página de creación
          variant="contained"
          startIcon={<AddIcon />} // Ícono de agregar
          sx={{
            bgcolor: "#2e7d32", // Color verde
            "&:hover": { bgcolor: "#1b5e20" }, // Color más oscuro al pasar el mouse
            borderRadius: "10px",
            textTransform: "none", // Sin mayúsculas automáticas
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", // Sombra
          }}
        >
          Nuevo libro
        </Button>
      </Box>

      {/* Mostrar spinner mientras carga */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Grid responsivo para mostrar las tarjetas de libros */}
      <Grid container spacing={3}>
        {libros.map((libro) => (
          // Cada libro se muestra en un item del grid
          // Los breakpoints definen cuántas columnas ocupa en diferentes tamaños de pantalla
          <Grid item xs={12} sm={6} md={4} lg={3} key={libro.id}>
            {/* Pasar el libro y la función de eliminar al componente de tarjeta */}
            <LibroCard libro={libro} onEliminar={onEliminar} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListaLibros;