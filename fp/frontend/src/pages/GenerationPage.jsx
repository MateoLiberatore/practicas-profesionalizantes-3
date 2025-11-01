
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GeneratorProvider } from "../context/GeneratorContext";
import ClassBuilder from "../features/generator/ClassBuilder";
import CodeOutput from "../features/generator/CodeOutput";
import { sendCodeGenerationRequest } from "../api/services/geminiService";
import NavBar from "../components/elements/NavBar";

function GenerationPage() {
  const { user, isInitialized } = useAuth();
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isInitialized) return <div className="text-center text-primary-100 mt-10">Cargando...</div>;
  if (!user) return <Navigate to="/" replace />;

  async function handleGenerateCode(formData) {
    setLoading(true);
    setGeneratedCode("");

    const payload = {
      task_type: "code_generation",
      data: {
        target_language: formData.language || "Python",
        user_instructions:
          formData.instructions || `Genera una clase ${formData.className || ""}`.trim(),
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
      setGeneratedCode(response.code || "");
    } catch (error) {
      alert(error.message || "Error al generar código.");
    } finally {
      setLoading(false);
    }
  }

  function handleClearCode() {
    setGeneratedCode("");
  }

  return (
    <GeneratorProvider>
      <div className="page-container">
        <NavBar />

        <div className="aligned-pair">
          <ClassBuilder onGenerate={handleGenerateCode} loading={loading} />
          <CodeOutput code={generatedCode} onClear={handleClearCode} />
        </div>
      </div>
    </GeneratorProvider>
  );
}

export default GenerationPage;
