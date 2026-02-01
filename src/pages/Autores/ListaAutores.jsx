import { useEffect, useState } from "react";
import { obtenerAutores } from "../../Services/autores_service";
import { Box, Typography, Grid } from "@mui/material"; // 👈 agrega Grid
import AutorCard from "../../components/cards/AutorCard";

export default function ListaAutores() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    cargarAutores();
  }, []);

  const cargarAutores = async () => {
    try {
      const data = await obtenerAutores();
      setAutores(data);
    } catch (error) {
      console.error("Error al cargar autores", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Autores
      </Typography>

      {/* ✅ GRID DE AUTORES */}
      <Grid container spacing={3}>
        {autores.map((autor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={autor.id}>
            <AutorCard autor={autor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}