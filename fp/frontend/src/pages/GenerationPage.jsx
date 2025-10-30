import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GeneratorProvider } from "../context/GeneratorContext";
import ClassBuilder from "../features/generator/ClassBuilder";
import CodeOutput from "../features/generator/CodeOutput";
import { sendCodeGenerationRequest } from "../api/services/geminiService";

function GenerationPage() {
  const { user, isInitialized } = useAuth();
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isInitialized) {
    return <div className="text-center text-primary-100 mt-10">Cargando...</div>;
  }

  if (!user) return <Navigate to="/" replace />;

  const handleGenerateCode = async (formData) => {
    setLoading(true);
    setGeneratedCode("");

    const payload = {
      task_type: "code_generation",
      data: {
        target_language: formData.language || "Python",
        user_instructions:
          formData.instructions || "Genera una clase básica de ejemplo",
        context_headers: {
          constructor: formData.constructor,
          metodos: formData.methods || [],
        },
        style_config: { variables: "snake_case" },
      },
    };

    try {
      const response = await sendCodeGenerationRequest(payload);
      setGeneratedCode(response.code);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneratorProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <ClassBuilder onGenerate={handleGenerateCode} loading={loading} />
        <CodeOutput code={generatedCode} onClear={() => setGeneratedCode("")} />
      </div>
    </GeneratorProvider>
  );
}

export default GenerationPage;
