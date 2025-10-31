import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GeneratorProvider } from "../context/GeneratorContext";
import ClassBuilder from "../features/generator/ClassBuilder";
import CodeOutput from "../features/generator/CodeOutput";
import { sendCodeGenerationRequest } from "../api/services/geminiService";

function GenerationPage() {
  const { user, isInitialized, handleLogout } = useAuth();
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isInitialized) return <div className="text-center text-primary-100 mt-10">Cargando...</div>;
  if (!user) return <Navigate to="/" replace />;

  const handleGenerateCode = async (formData) => {
    setLoading(true);
    setGeneratedCode("");

    const payload = {
      task_type: "code_generation",
      data: {
        target_language: formData.language || "Python",
        user_instructions: formData.instructions || `Genera una clase ${formData.className || ""}`.trim(),
        context_headers: {
          constructor: {
            className: formData.className || "",
            params: formData.params || [],
            properties: formData.properties || [],
          },
          metodos: formData.methods || [],
        },
        style_config: { variables: formData.variableStyle || "snake_case" },
      },
    };

    try {
      const response = await sendCodeGenerationRequest(payload);
      // backend devuelve { code: "..." }
      setGeneratedCode(response.code || "");
    } catch (error) {
      alert(error.message || "Error al generar código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneratorProvider>
      <div className="p-6 flex flex-col gap-4 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-200">Generador</h1>
          <div className="flex gap-2">
            <button
              onClick={() => { handleLogout(); }}
              className="bg-terciary-500 text-white px-3 py-1 rounded-md hover:bg-terciary-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClassBuilder onGenerate={handleGenerateCode} loading={loading} />
          <CodeOutput code={generatedCode} onClear={() => setGeneratedCode("")} />
        </div>
      </div>
    </GeneratorProvider>
  );
}

export default GenerationPage;
