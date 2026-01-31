import { useState, useEffect } from "react";
import { Box, Container, Button, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const logoLibreria =
  "https://www.terramall.co.cr/wp-content/uploads/2024/10/Libreria-Accesorios.png";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("username"));
  }, []);

  const handleNavigate = async (path) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 200));
    navigate(path);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 300));
    localStorage.clear();
    navigate("/login");
    setIsLogged(false);
    setLoading(false);
  };

  const navBtn = {
    color: "white",
    fontSize: "0.9rem",
    textTransform: "none",
    "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
  };

  return (
    <>
      {/* HEADER */}
      <Box
        component="header"
        sx={{
          position: "relative",
          bgcolor: "#2b2b2b",
          height: 220,
        }}
      >
        {/* LOGO */}
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <img
            src={logoLibreria}
            alt="Librería Logo"
            style={{
              height: "150px",
              width: "420px",
              filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.6))",
            }}
          />
        </Box>

        {/* NAVBAR SUPERPUESTO */}
        <Box
          component="nav"
          sx={{
            position: "absolute",
            bottom: -24,
            left: 0,
            width: "100%",
            zIndex: 10,
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#3a3a3a",
                px: 3,
                py: 0.5,
                borderRadius: "14px",
                minHeight: "48px",
                width: "92%",
                mx: "auto",
                boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
              }}
            >
              {/* LINKS */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
                  Volver
                </Button>

                <Button sx={navBtn} onClick={() => handleNavigate("/")}>
                  Inicio
                </Button>
                <Button sx={navBtn} onClick={() => handleNavigate("/autores")}>
                  Autores
                </Button>
                <Button sx={navBtn} onClick={() => handleNavigate("/reservas")}>
                  Reservas
                </Button>

                <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#555" }} />

                {isLogged && (
                  <>
                    <Button
                      sx={{ ...navBtn, color: "#90caf9" }}
                      onClick={() => handleNavigate("/libros/crear")}
                    >
                      + Libro
                    </Button>

                    <Button
                      sx={{ ...navBtn, color: "#90caf9" }}
                      onClick={() => handleNavigate("/autores/crear")}
                    >
                      + Autor
                    </Button>

                    <Button
                      sx={{ ...navBtn, color: "#90caf9" }}
                      onClick={() => handleNavigate("/reservas/crear")}
                    >
                      + Reserva
                    </Button>
                  </>
                )}
              </Box>
              {/* AUTH */}
              {isLogged ? (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "#d32f2f",
                    "&:hover": { bgcolor: "#b71c1c" },
                  }}
                >
                  Salir
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    bgcolor: "#2e7d32",
                    "&:hover": { bgcolor: "#1b5e20" },
                  }}
                >
                  Iniciar sesión
                </Button>
              )}
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ESPACIADOR PARA QUE NO SE PEGUE A LAS CARDS */}
      <Box sx={{ height: 10 }} />

      {/* SPINNER */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.6)",
            zIndex: 9999,
          }}
        >
          <Spinner />
        </Box>
      )}
    </>
  );
}
