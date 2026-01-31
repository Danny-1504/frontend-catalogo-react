import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Login from "../pages/Login/Login";

import ListaAutores from "../pages/Autores/ListaAutores";
import ObrasAutor from "../pages/Autores/ObrasAutor";
import AutorDetalle from "../pages/Autores/AutorDetalle";
import AutorEditar from "../pages/Autores/AutorEditar";
import AutorCrear from "../pages/Autores/AutorCrear";

import ListaLibros from "../pages/Libros/ListaLibros";

import ListaReservas from "../pages/Reservas/ListaReservas";
import CrearReserva from "../pages/Reservas/ReservaCrear";
import ReservaEditar from "../pages/Reservas/ReservaEditar";

export default function AppRoutes() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* CONTENIDO */}
      <Box sx={{ flex: 1, mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/autores" element={<ListaAutores />} />
          <Route path="/autores/:id/obras" element={<ObrasAutor />} />
          <Route path="/autores/:id" element={<AutorDetalle />} />
          <Route path="/autores/editar/:id" element={<AutorEditar />} />
          <Route path="/autores/crear" element={<AutorCrear />} />



          <Route path="/" element={<ListaLibros />} />


          <Route path="/reservas" element={<ListaReservas />} />
          <Route path="/reservas/crear" element={<CrearReserva />} />
          <Route path="/reservas/editar/:id" element={<ReservaEditar />} />

        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
