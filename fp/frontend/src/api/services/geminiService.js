const GEMINI_ENDPOINT = "http://localhost:5000/api/v1/gemini/process";

export async function sendCodeGenerationRequest(payload) {
  const token = localStorage.getItem("token");

  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let body = {};
      try {
        body = await res.json();
      } catch {}
      throw new Error(body.message || `Error ${res.status} in generation`);
    }

    return await res.json();
  } catch (error) {
    console.error("Server connection error:", error);
    throw new Error(error.message || "Server connection error.");
  }
}
