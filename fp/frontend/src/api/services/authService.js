
const BASE_URL = "http://localhost:5000/api/v1/auth";


/**
 * Envía las credenciales al backend y obtiene el token JWT si son válidas.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Datos de respuesta del backend (token, usuario, etc.)
 */
export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Usuario o contraseña no proporcionados.");
    }

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Permite cookies/CORS si las hubiera
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al iniciar sesión: ${errorText}`);
    }

    const data = await response.json();
    console.log("Respuesta del servidor (login):", data);
    return data;
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    throw error;
  }
};

/**
 * Obtiene el perfil del usuario autenticado usando el token JWT.
 * @param {string} token
 * @returns {Promise<Object>} Datos del perfil de usuario
 */
export const getProfile = async (token) => {
  try {
    if (!token) throw new Error("Token no encontrado.");

    const response = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el perfil del usuario.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProfile:", error.message);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario eliminando el token del almacenamiento local.
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
};
