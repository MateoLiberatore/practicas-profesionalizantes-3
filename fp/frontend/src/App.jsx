import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
//import { AuthProvider } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import GenerationPage from './pages/GenerationPage';

function App() {

  return (
    <BrowserRouter>

        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<GenerationPage/>} /> 
        </Routes>
  
    </BrowserRouter>
  );
}

export default App;