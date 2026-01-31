import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AutorDetallePage() {
  const { id } = useParams(); // toma el id de la URL
  const [autor, setAutor] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/autores/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAutor(res.data);
      } catch (error) {
        console.error("Error al cargar el autor:", error);
      }
    };
    fetchAutor();
  }, [id, token]);

  if (!autor) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 2, color: "#1a1a1a" }}>
      <Typography variant="h3">{autor.nombre} {autor.apellido}</Typography>
      <Typography variant="h5">Nacionalidad: {autor.nacionalidad || "No disponible"}</Typography>
      <Typography variant="body1">Biografía: {autor.biografia || "No disponible"}</Typography>
      <Typography variant="body2">Sitio web: {autor.sitio_web || "No disponible"}</Typography>

      {autor.imagen && (
        <img
          src={autor.imagen.startsWith("http") ? autor.imagen : `http://127.0.0.1:8000${autor.imagen}`}
          alt={`${autor.nombre} ${autor.apellido}`}
          style={{ maxWidth: "300px", marginTop: "16px" }}
        />
      )}
    </Box>
  );
}