import axios from "axios";

// Obtener todas las reservas - VERSIÓN CORREGIDA
export const obtenerReservas = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.get("http://127.0.0.1:8000/api/reservas/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // TRANSFORMA los datos para que coincidan con tu frontend
    return res.data.map(reserva => ({
      id: reserva.id,
      usuario_nombre: reserva.usuario || "Usuario", // Cambia según tu API
      fecha_inicio: reserva.fecha_reserva, // ← ¡IMPORTANTE! Mapear
      fecha_fin: reserva.fecha_devolucion,  // ← ¡IMPORTANTE! Mapear
      libro_id: reserva.libro,
      libro_titulo: reserva.libro_titulo || `Libro ID: ${reserva.libro}`
    }));
    
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    return [];
  }
};

// Crear reserva - YA FUNCIONA (no cambiar)
export const crearReserva = async (libroId, fechaInicio, fechaFin) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.post(
      "http://127.0.0.1:8000/api/reservas/",
      {
        libro: libroId,
        usuario: "current", // Esto funciona, déjalo así
        fecha_reserva: fechaInicio, 
        fecha_devolucion: fechaFin,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error al crear reserva:", error.response?.data || error);
    throw error;
  }
};

// Editar reserva - VERSIÓN CORREGIDA
export const editarReserva = async (id, fechaInicio, fechaFin) => {
  try {
    const token = localStorage.getItem("access_token");
    
    // CORREGIDO: Usa los nombres que espera tu backend
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/reservas/${id}/`,
      {
        // NO envíes libro ni usuario al editar (solo fechas)
        fecha_reserva: fechaInicio, // ← CORREGIDO
        fecha_devolucion: fechaFin,  // ← CORREGIDO
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error al editar reserva:", error.response?.data || error);
    throw error;
  }
};

// Eliminar una reserva - VERSIÓN CORREGIDA
export const eliminarReserva = async (id) => {
  try {
    const token = localStorage.getItem("access_token"); // ← Mover dentro de la función
    await axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    throw error;
  }
};

// FUNCIÓN ADICIONAL para debuggear
export const debugReservas = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.get("http://127.0.0.1:8000/api/reservas/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Datos CRUDOS de la API:", res.data);
    console.log("Primera reserva:", res.data[0]);
    return res.data;
  } catch (error) {
    console.error("Error en debug:", error);
    return [];
  }
};