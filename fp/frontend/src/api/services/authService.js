
const BASE_URL = "http://localhost:5000/api/v1/auth";


export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Username or password not provided.");
    }

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login Error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Server Response (login):", data);
    return data;
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
};


export const getProfile = async (token) => {
  try {
    if (!token) throw new Error("Token not found.");

    const response = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Could not fetch user profile.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProfile:", error.message);
    throw error;
  }
};


export const logoutUser = () => {
  localStorage.removeItem("token");
};
