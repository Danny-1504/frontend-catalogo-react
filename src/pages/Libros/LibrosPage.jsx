import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LibrosPage() {
    const [libros, setLibros] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const cargarLibros = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/libros/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setLibros(data);
        } catch (error) {
            console.error("Error cargando libros:", error);
        }
    };

    useEffect(() => {
        cargarLibros();
    }, []);

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Eliminar este libro?")) return;
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/libros/${id}/`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error al eliminar");
            alert("Libro eliminado");
            cargarLibros();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar libro");
        }
    };

    return (
        <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 2 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Libros</Typography>

            <Button variant="contained" sx={{ mb: 3 }} onClick={() => navigate("/libros/nuevo")}>
                + Nuevo Libro
            </Button>

            <Grid container spacing={3}>
                {libros.map((libro) => (
                    <Grid key={libro.id} xs={12} sm={6} md={4}>
                        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                            {libro.imagen && (
                                <img
                                    src={libro.imagen.startsWith("http") ? libro.imagen : `http://127.0.0.1:8000${libro.imagen}`}
                                    alt={libro.titulo}
                                    style={{ maxWidth: "300px", marginTop: "16px" }}
                                />
                            )}
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h6">{libro.titulo}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {libro.autor_nombre || libro.autor} {/* autor_nombre si lo agregas en serializer */}
                                </Typography>
                            </CardContent>

                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                <Button size="small" variant="outlined" onClick={() => navigate(`/libros/ver/${libro.id}`)}>
                                    Ver
                                </Button>
                                <Button size="small" variant="contained" onClick={() => navigate(`/libros/editar/${libro.id}`)}>
                                    Editar
                                </Button>
                                <Button size="small" variant="contained" color="error" onClick={() => handleEliminar(libro.id)}>
                                    Eliminar
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}