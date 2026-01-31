import { useEffect, useState } from "react";
import { obtenerLibros } from "../../Services/libros_service";
import LibroCard from "../../components/cards/LibroCard";

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await obtenerLibros();
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    };

    cargarLibros();
  }, []);

  return (
    <div className="grid">
      {libros.map((libro) => (
        <LibroCard key={libro.id} libro={libro} />
      ))}
    </div>
  );
};

export default ListaLibros;
