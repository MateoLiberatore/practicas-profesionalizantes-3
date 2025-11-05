
import React from "react";
import Login from "./Login";

function LoginContainer() {

  return (
    <div
      className="flex items-center justify-center min-h-screen ml-10 bg-secondary-800"
    >
      <div className="bg-transparent p-8 rounded-2xl shadow-login text-primary-300">
        <h1 className=" mb-15 text-7xl font-bold text-primary-200 text-center align-">&gt;PreCode</h1>
        <Login />
        <div className="card p-3 mt-5 text-sm text-primary-300 font-bold">
          <p className="">If you are a guest:</p>
          <p className="">email:    guest@example.com</p>
          <p className="">password: guest</p>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
