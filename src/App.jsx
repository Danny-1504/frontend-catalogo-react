import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login/Login";
import LibrosPage from "./pages/Libros/LibrosPage";
import LibroFormPage from "./pages/Libros/LibroFormPage";
import LibroDetallePage from "./pages/Libros/LibroDetallePage";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LibrosPage />} />
            <Route path="/libros/nuevo" element={<LibroFormPage />} />
            <Route path="/libros/ver/:id" element={<LibroDetallePage />} />
            <Route path="/libros/editar/:id" element={<LibroFormPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;