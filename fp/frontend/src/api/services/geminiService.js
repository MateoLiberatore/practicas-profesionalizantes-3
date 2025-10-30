const GEMINI_URL = "http://localhost:5000/gemini/process";

export async function sendCodeGenerationRequest(payload) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al generar código.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en sendCodeGenerationRequest:", error.message);
    throw error;
  }
}
