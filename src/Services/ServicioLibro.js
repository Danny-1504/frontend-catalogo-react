// src/Services/ServicioLibro.js
import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api/libros/";

// Función para obtener el token OAuth2 desde localStorage
const getToken = () => {
  return localStorage.getItem("access_token"); // asegúrate de guardarlo al loguear
};

// Configuración de headers para requests que requieren autenticación
const authConfig = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
};

// ----------------- CRUD LIBROS -----------------

// Obtener todos los libros (GET) - público
export const obtenerLibros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener libro por ID (GET) - público
export const obtenerLibroPorId = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};

// Crear libro (POST) - requiere token
export const crearLibro = async (libro) => {
  const formData = new FormData();
  formData.append("titulo", libro.titulo);
  formData.append("autor", libro.autor);
  if (libro.imagen) formData.append("imagen", libro.imagen);

  const response = await axios.post(API_URL, formData, authConfig());
  return response.data;
};

// Actualizar libro (PUT) - requiere token
export const actualizarLibro = async (id, libro) => {
  const formData = new FormData();
  formData.append("titulo", libro.titulo);
  formData.append("autor", libro.autor);
  if (libro.imagen) formData.append("imagen", libro.imagen);

  const response = await axios.put(`${API_URL}${id}/`, formData, authConfig());
  return response.data;
};

// Eliminar libro (DELETE) - requiere token
export const eliminarLibro = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`, authConfig());
  return response.data;
};

// ----------------- FUNCIONES ADICIONALES -----------------
export const reservarLibro = async (libroId) => {
  try {
    const token = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("libro", libroId);
    formData.append("usuario", localStorage.getItem("username") || "anonimo");

    // 🔹 Agregamos fechas
    const hoy = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const devolucion = new Date();
    devolucion.setDate(devolucion.getDate() + 7); // 7 días después
    formData.append("fecha_reserva", hoy);
    formData.append("fecha_devolucion", devolucion.toISOString().split("T")[0]);

    const res = await fetch("http://127.0.0.1:8000/api/reservas/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Error al reservar el libro");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en reservarLibro:", error);
    return null;
  }
};
export const obtenerReservasDeLibro = async (libroId) => {
  try {
    const token = localStorage.getItem("access_token"); 
    const res = await fetch(`http://127.0.0.1:8000/api/reservas/?libro=${libroId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener reservas");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerReservasDeLibro:", error);
    return [];
  }
};
// Obtener todas las reservas
export const obtenerReservas = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://127.0.0.1:8000/api/reservas/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener reservas");
    return await res.json();
  } catch (error) {
    console.error("Error en obtenerReservas:", error);
    return [];
  }
};

// Eliminar reserva por ID
export const eliminarReserva = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`http://127.0.0.1:8000/api/reservas/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar reserva");
    return true;
  } catch (error) {
    console.error("Error en eliminarReserva:", error);
    return false;
  }
};