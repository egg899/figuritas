import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import FiguritaCard from "./componentes/FirguritaCard";
import { Login } from "./componentes/Login";
import { Registro } from "./componentes/Registro";

function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );
  const [figuritas, setFiguritas] = useState([]);
  const [album, setAlbum] = useState([]);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const obtenerFiguritas = async () => {
    const res = await api.get("/figuritas");
    setFiguritas(res.data);
  };

  const obtenerAlbum = async () => {
    if (!usuario) return;
    const res = await api.get(`/usuarios/${usuario._id}/album`);
    setAlbum(res.data);
  };

  useEffect(() => {
    if (usuario) {
      obtenerFiguritas();
      obtenerAlbum();
    }
  }, [usuario]);

  const estaDesbloqueada = (id) => album.some((f) => f._id === id);

  if (!usuario) {
    return (
      <div>
        {mostrarRegistro ? (
          <Registro setUsuario={setUsuario} />
        ) : (
          <Login setUsuario={setUsuario} />
        )}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            className="elButton"
            onClick={() => setMostrarRegistro(!mostrarRegistro)}
          >
            {mostrarRegistro ? "Ya tengo cuenta" : "Crear cuenta nueva"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header fijo */}
      <header
        style={{
          padding: "20px",
          background: "#f3f3f3",
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0 }}>Álbum de Figuritas de {usuario.equipo}</h1>
        <h2 style={{ margin: "10px 0 0 0", color: "#007bff" }}>
          Equipo logueado: {usuario.equipo}
        </h2>
        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            localStorage.removeItem("usuario");
            setUsuario(null);
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Contenedor de figuritas con scroll */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "50px", // aumentamos el espacio entre figuritas

            justifyItems: "center",
          }}
        >
          {figuritas.map((fig) => (
            <FiguritaCard
              key={fig._id}
              fig={fig}
              desbloqueada={estaDesbloqueada(fig._id)}
              usuarioId={usuario._id}
              obtenerAlbum={obtenerAlbum}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
