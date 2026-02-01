import { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
    crearLibro,
    editarLibro,
    obtenerLibroPorId,
} from "../../Services/libros_service";
import { obtenerAutores } from "../../Services/autores_service";

const FormLibro = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        titulo: "",
        autor: "",
        genero: "",
        anio_publicacion: "",
        descripcion: "",
        imagen_url: "",
    });

    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(false);
    const esEdicion = Boolean(id);

    useEffect(() => {
        const cargarAutores = async () => {
            try {
                const data = await obtenerAutores();
                setAutores(data);
            } catch (error) {
                console.error("Error cargando autores:", error);
            }
        };

        cargarAutores();
    }, []);

    useEffect(() => {
        if (!esEdicion) return;

        const cargarLibro = async () => {
            try {
                const data = await obtenerLibroPorId(id);
                setForm({
                    titulo: data.titulo || "",
                    autor: data.autor || "",
                    genero: data.genero || "",
                    anio_publicacion: data.anio_publicacion || "",
                    descripcion: data.descripcion || "",
                    imagen_url: data.imagen_url || "",
                });
            } catch (error) {
                console.error(error);
                alert("Libro no encontrado");
                navigate("/");
            }
        };

        cargarLibro();
    }, [id, esEdicion, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (esEdicion) {
                await editarLibro(id, form);
                alert("Libro actualizado");
            } else {
                await crearLibro(form);
                alert("Libro creado");
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Error al guardar libro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Paper sx={{ p: 4, width: 420, borderRadius: 3, boxShadow: 6 }}>
                <Typography variant="h6" fontWeight="bold" mb={2} align="center">
                    {esEdicion ? "Editar libro" : "Crear libro"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Título"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    {/* ✅ SELECT DE AUTORES CORREGIDO */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="autor-label">Autor</InputLabel>
                        <Select
                            labelId="autor-label"
                            label="Autor"
                            name="autor"
                            value={form.autor}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Seleccione autor</MenuItem>
                            {autores.map((a) => (
                                <MenuItem key={a.id} value={a.id}>
                                    {a.nombres} {a.apellidos}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Género"
                        name="genero"
                        value={form.genero}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Año de publicación"
                        name="anio_publicacion"
                        type="number"
                        value={form.anio_publicacion}
                        onChange={(e) =>
                            setForm({ ...form, anio_publicacion: Number(e.target.value) })
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Descripción"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="URL de imagen"
                        name="imagen_url"
                        value={form.imagen_url}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {esEdicion ? "Actualizar" : "Crear"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default FormLibro;