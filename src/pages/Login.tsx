import React, { useState } from "react";
import { setToken } from "../utils/sessionStorage";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const BACKEND_BASE_URL = "https://node-seltinel.onrender.com";
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        navigate("/user");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <label className="block text-gray-700 font-medium text-left">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 mb-3 px-4 py-2 border border-gray-300 rounded"
      />

      <label className="block text-gray-700 font-medium text-left">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-1 mb-3 px-4 py-2 border border-gray-300 rounded"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <div className="flex justify-end mt-4 cursor-pointer text-blue-500">
        <div onClick={() => navigate("/register")}>Create Account?</div>
      </div>
    </form>
  );
};

export default LoginForm;
