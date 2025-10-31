import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import GenerationPage from "./pages/GenerationPage";

function App() {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) return <div>Cargando...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/form" /> : <LandingPage />} />
        <Route path="/form" element={user ? <GenerationPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
