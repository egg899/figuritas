import { useState } from "react";
import api from "../api";

export const Login = ({ setUsuario }) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { equipo: nombre, password });
      setUsuario(res.data);
      localStorage.setItem("usuario", JSON.stringify(res.data));
    } catch (err) {
      alert(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <input
          type="text"
          placeholder="Nombre del equipo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};
