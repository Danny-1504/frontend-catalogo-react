import { useEffect, useState } from "react";
import { obtenerAutores } from "../../Services/autores_service";
import { Box, Typography } from "@mui/material";
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

      {autores.map((autor) => (
        <AutorCard key={autor.id} autor={autor} />
      ))}
    </Box>
  );
}
