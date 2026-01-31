import { useState, useEffect } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Icono de libro
import { useNavigate, useLocation } from "react-router-dom"; 
import { logout } from "../Services/ServicioUsuario"; // Usamos tu servicio de logout
import CircularProgress from "@mui/material/CircularProgress"; // Usamos el de MUI si no tienes el custom

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // Para saber en qué página estamos

  // Logo desde una URL externa (Link)
  const logoLibreria = "https://tu-link-de-imagen.com/logo.png"; 

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLogged(!!user);
    setUsername(user || "");
  }, [location]); // Se dispara cada vez que cambiamos de página

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Llamamos a la lógica de revocación de token en Django
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
    // Simulamos una pequeña carga para que el spinner sea visible (opcional)
    await new Promise(res => setTimeout(res, 300));
    navigate(path);
    setLoading(false);
  };

  return (
    <Box component="header" sx={{ backgroundColor: "#1a1a1a", textAlign: "center", pt: 2, position: "relative" }}>
      
      {/* SECCIÓN DEL LOGO (URL Externa) */}
      <Box sx={{ position: "relative", zIndex: 1, mb: "-30px" }}>
        <img 
          src={logoLibreria} 
          alt="Librería Logo" 
          style={{ height: "100px", cursor: "pointer", filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.5))" }} 
          onClick={() => handleNavigate("/")}
        />
      </Box>

      {/* BARRA DE NAVEGACIÓN */}
      <Box component="nav" sx={{ py: "20px", position: "relative", zIndex: 10 }}>
        <Container>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            bgcolor: "#2c2c2c", 
            p: "12px 24px", 
            borderRadius: "16px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
          }}>
            
            {/* BOTONES IZQUIERDA: Navegación de la Librería */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => navigate(-1)}
                sx={{ color: "#aaa", borderColor: "#555" }}
              >
                Volver
              </Button>
              
              <Button onClick={() => handleNavigate("/")} sx={{ color: "white" }}>Inicio</Button>
              
              {isLogged && (
                <>
                  <Button onClick={() => handleNavigate("/libros/nuevo")} sx={{ color: "#90caf9" }}>+ Añadir Libro</Button>
                  <Button onClick={() => handleNavigate("/reservas")} sx={{ color: "white" }}>Mis Reservas</Button>
                </>
              )}
            </Box>

            {/* BOTONES DERECHA: Autenticación */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isLogged ? (
                <>
                  <Typography variant="body2" sx={{ color: "#fff", fontStyle: "italic" }}>
                    Hola, {username}
                  </Typography>
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
        </Container>
      </Box>

      {/* SPINNER GLOBAL DE NAVEGACIÓN */}
      {loading && (
        <Box sx={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            display: "flex", justifyContent: "center", alignItems: "center",
            bgcolor: "rgba(0,0,0,0.7)", zIndex: 9999,
        }}>
          <CircularProgress size={60} color="primary" />
        </Box>
      )}
    </Box>
  );
}