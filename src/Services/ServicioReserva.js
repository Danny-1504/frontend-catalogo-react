import axios from "axios";

const token = localStorage.getItem("access_token");

// Obtener todas las reservas
export const obtenerReservas = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/reservas/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    return [];
  }
};
// Crear reserva
export const crearReserva = async (libroId, fechaInicio, fechaFin) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.post(
      "http://127.0.0.1:8000/api/reservas/",
      {
        libro: libroId,
        usuario: "current", // 🔹 si tu backend infiere usuario por token, a veces se puede omitir
        fecha_reserva: fechaInicio, // 🔹 nombre que espera DRF
        fecha_devolucion: fechaFin,  // 🔹 nombre que espera DRF
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error al crear reserva:", error.response?.data || error);
    throw error;
  }
};
// Editar reserva
export const editarReserva = async (id, fechaInicio, fechaFin) => {
  try {
    const token = localStorage.getItem("access_token"); // 🔹 obtener token
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/reservas/${id}/`,
      {
        libro: libroId,
        usuario: "current",
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
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

// Eliminar una reserva
export const eliminarReserva = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    throw error;
  }
};
