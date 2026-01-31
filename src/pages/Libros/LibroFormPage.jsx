import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Autocomplete } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { crearLibro, actualizarLibro, obtenerLibroPorId } from "../../Services/ServicioLibro";

export default function LibroFormPage() {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState(null); // <-- ahora guardamos ID
  const [autores, setAutores] = useState([]);
  const [imagen, setImagen] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar autores
  useEffect(() => {
    (async () => {
      const autoresData = await fetch("http://127.0.0.1:8000/api/autores/").then(res => res.json());
      setAutores(autoresData); // array de {id, nombre, apellido}
    })();
  }, []);

  // Cargar libro si estamos editando
  useEffect(() => {
    if (id) {
      (async () => {
        const libro = await obtenerLibroPorId(id);
        setTitulo(libro.titulo);
        setAutorId(libro.autor); // DRF devuelve autor = id
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autorId) {
      alert("Debes seleccionar un autor válido");
      return;
    }

    const libroData = new FormData();
    libroData.append("titulo", titulo);
    libroData.append("autor", autorId); // <-- ID del autor
    if (imagen) libroData.append("imagen", imagen);

    try {
      if (id) {
        await actualizarLibro(id, { titulo, autor: autorId, imagen });
      } else {
        await crearLibro({ titulo, autor: autorId, imagen });
      }
      navigate("/");
    } catch (error) {
      console.error("Error al guardar libro:", error);
      alert("Error al guardar libro. Revisa la consola.");
    }
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {id ? "Editar Libro" : "Nuevo Libro"}
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <Autocomplete
          options={autores}
          getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
          value={autores.find(a => a.id === autorId) || null}
          onChange={(e, newValue) => setAutorId(newValue ? newValue.id : null)}
          renderInput={(params) => <TextField {...params} label="Autor" fullWidth sx={{ mb: 2 }} required />}
        />

        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Subir Imagen
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Button>
        {imagen && <Typography>Imagen seleccionada: {imagen.name}</Typography>}

        <Button type="submit" variant="contained">
          {id ? "Actualizar" : "Crear"}
        </Button>
      </form>
    </Box>
  );
}