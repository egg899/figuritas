import { useState } from "react";
import api from "../api";

export const Registro = ({ setUsuario }) => {
  const [nombre, setNombre] = useState("");
  const [equipo, setEquipo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", { nombre, equipo, password });
      alert("Registro exitoso ✅");
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
    } catch (err) {
      alert(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre del jugador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nombre del equipo"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
};
