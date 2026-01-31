import { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  // Traer autores desde Django
  const fetchAutores = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/autores/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAutores(res.data);
    } catch (error) {
      console.error("Error al cargar autores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  // Eliminar autor
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este autor?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/autores/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAutores();
    } catch (error) {
      console.error("Error al eliminar autor:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Autores
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/autores/nuevo")}
      >
        + Nuevo Autor
      </Button>

      <Grid container spacing={2}>
        {autores.map((autor) => (
          <Grid key={autor.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              {autor.imagen ? (
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover" }}
                  image={autor.imagen.startsWith("http") ? autor.imagen : `http://127.0.0.1:8000${autor.imagen}`}
                  alt={`${autor.nombre} ${autor.apellido}`}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">Sin imagen</Typography>
                </Box>
              )}

              <CardContent>
                <Typography variant="h6">
                  {autor.nombre} {autor.apellido}
                </Typography>
                <Typography variant="body2">{autor.nacionalidad}</Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/autores/${autor.id}`)}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/autores/editar/${autor.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(autor.id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}