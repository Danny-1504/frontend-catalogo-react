import { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../Services/ServicioUsuario";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const logoLibreria = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4KbwBWXAbrGwxXzzhmgJbEOrLuINXF_GrUQ&s";

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLogged(!!user);
    setUsername(user || "");
  }, [location]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setIsLogged(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = async (path) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 200));
    navigate(path);
    setLoading(false);
  };

  return (
    <Box component="header" sx={{ width: "100vw", maxWidth: "100%", textAlign: "center", position: "relative" }}>
      
      {/* LOGO */}
      <Box sx={{ width: "100%", mb: 2, bgcolor: "#f9f9f9", py: 2 }}>
        <img
          src={logoLibreria}
          alt="Librería Logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            cursor: "pointer",
            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.5))",
          }}
          onClick={() => handleNavigate("/")}
        />
      </Box>

      {/* BARRA DE NAVEGACIÓN */}
      <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 1, bgcolor: "#0026ff" }}>
        <Box sx={{width: "100%",maxWidth: "1200px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
          
          {/* IZQUIERDA */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
            <Button variant="outlined" size="small" onClick={() => navigate(-1)} sx={{ color: "#fff", borderColor: "#888" }}>
              Volver
            </Button>
            <Button onClick={() => handleNavigate("/")} sx={{ color: "#fff" }}>Inicio</Button>

            {isLogged && (
              <>
                <Button onClick={() => handleNavigate("/libros/nuevo")} sx={{ color: "#ffffff" }}>+ Libro</Button>
                <Button onClick={() => handleNavigate("/reservas")} sx={{ color: "#ffffff" }}>Reservas</Button>
                <Button onClick={() => handleNavigate("/autores")} sx={{ color: "#ffffff" }}>Autores</Button>
              </>
            )}
          </Box>

          {/* DERECHA */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            {isLogged ? (
              <>
                <Typography variant="body2" sx={{ color: "#fff", fontStyle: "italic" }}>Hola, {username}</Typography>
                <Button
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{ bgcolor: "#d32f2f", "&:hover": { bgcolor: "#b71c1c" }, borderRadius: "8px" }}
                >
                  Salir
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleNavigate("/login")}
                startIcon={<LoginIcon />}
                sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" }, borderRadius: "8px" }}
              >
                Entrar
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* SPINNER */}
      {loading && (
        <Box sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "rgba(0,0,0,0.7)",
          zIndex: 9999,
        }}>
          <CircularProgress size={60} color="primary" />
        </Box>
      )}
    </Box>
  );
}