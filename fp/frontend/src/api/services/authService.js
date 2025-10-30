const API_URL = "http://localhost:5000/auth/login";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en login");
    }

    return data; // ✅ Retorna { message, data: { token, user } }
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    throw error;
  }
};
