import React, { useState } from 'react';
import Button from '../../components/UI/Button';

function Login({ onSubmit, isLoading, apiError }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password); 
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
  <div className="flex flex-col gap-6 p-8"> 

    <h2 className="text-xl font-semibold text-primary-300">
      Iniciar Sesión
    </h2>
   
    <form onSubmit={handleSubmit} className="flex flex-col gap-5"> 
    {apiError && (
     <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
      {apiError}
     </p>
    )}

    <div className="flex flex-col gap-1">

     <label htmlFor="email" className="text-sm font-medium text-primary-300">
      Correo Electrónico
     </label>

     <input
      type="email"
      id="email"
      placeholder="usuario@ejemplo.com"
      className="bg-primary-200 p-3 rounded-lg w-full focus:outline-none 
       focus:border-primary-200 "
      name="email"
      value={email}
      onChange={handleEmailChange}
      required
     />
    </div>

    <div className="flex flex-col gap-1">
     <label htmlFor="password" className="text-sm font-medium text-primary-300">
      Contraseña
     </label>
     <input
      type="password"
      id="password"
      placeholder="********"
      className="bg-primary-200 p-3 rounded-lg w-full focus:outline-none 
       focus:border-primary-200 "
      name="password"
      value={password}
      onChange={handlePasswordChange}
      required
     />
    </div>

    <Button 
     label={isLoading ? "Cargando..." : "Entrar"}
     type="primary" 
     htmlType="submit"
     disabled={isLoading}
     className="bg-primary-200 w-1/2 rounded-lg h-10 focus:outline-none focus:ring-2 mx-auto mt-1.5
     focus:border-primary-200 border-0 text-secondary-900" 
    />

    <div className="mt-4 text-center">
     <a href="#" className="text-sm text-primary-300 hover:underline">
      ¿Olvidaste tu contraseña?
     </a>
    </div>
   </form>
  </div>
  );
}

export default Login;