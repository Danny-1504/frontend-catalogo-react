import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function AutorFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenActual, setImagenActual] = useState(null);

  const token = localStorage.getItem("access_token");

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      const cargarAutor = async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/autores/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setNombre(data.nombre);
          setApellido(data.apellido);
          setNacionalidad(data.nacionalidad);
          setImagenActual(data.imagen);
        } catch (error) {
          console.error("Error al cargar autor:", error);
        }
      };
      cargarAutor();
    }
  }, [id, token]);

  // Guardar autor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("nacionalidad", nacionalidad);
    if (imagen) formData.append("imagen", imagen);

    try {
      let res;
      if (id) {
        res = await fetch(`http://127.0.0.1:8000/api/autores/${id}/`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch("http://127.0.0.1:8000/api/autores/", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Error guardando autor");
      alert(id ? "Autor actualizado" : "Autor creado");
      navigate("/autores");
    } catch (error) {
      console.error(error);
      alert("Error al guardar autor");
    }
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {id ? "Editar Autor" : "Nuevo Autor"}
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nacionalidad"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
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

        {/* Imagen actual */}
        {imagenActual && !imagen && (
          <Box sx={{ mb: 2 }}>
            <Typography>Imagen actual:</Typography>
            <img
              src={imagenActual.startsWith("http") ? imagenActual : `http://127.0.0.1:8000${imagenActual}`}
              alt={`${nombre} ${apellido}`}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: "50%",
                marginTop: 8,
              }}
            />
          </Box>
        )}

        {imagen && (
          <Typography sx={{ mb: 2 }}>Imagen seleccionada: {imagen.name}</Typography>
        )}

        <Button type="submit" variant="contained">
          {id ? "Actualizar Autor" : "Crear Autor"}
        </Button>
      </form>
    </Box>
  );
}