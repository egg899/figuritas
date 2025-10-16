import { useState } from "react";
import api from "../api";

function FiguritaCard({ fig, desbloqueada, usuarioId, obtenerAlbum }) {
  const [codigo, setCodigo] = useState("");
  const [animar, setAnimar] = useState(false);

  const handleDesbloquear = async () => {
    try {
      const res = await api.post(`/usuarios/${usuarioId}/desbloquear`, { codigo });
      alert(res.data.mensaje);
      setCodigo("");
      setAnimar(true);
      setTimeout(() => {
        obtenerAlbum();
        setAnimar(false);
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.error || "Error al desbloquear");
    }
  };

  return (
    <div
      style={{
        perspective: "1000px",
        width: "220px",
        height: "280px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transformStyle: "preserve-3d",
          transition: "transform 1s",
          transform: animar || desbloqueada ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente (bloqueada) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/61/61457.png"
            alt="bloqueada"
            style={{
              width: "120px",
              height: "120px",
              opacity: "0.8",
              marginBottom: "10px",
            }}
          />
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "80%",
              textAlign: "center",
              marginBottom: "8px",
            }}
          />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#333",
            }}
          >
            {fig.nombre}
          </p>
          <button
            onClick={handleDesbloquear}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Desbloquear
          </button>
        </div>

        {/* Dorso (desbloqueada) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <img
            src={fig.url}
            alt={fig.nombre}
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "3px solid #4caf50",
              marginBottom: "10px",
            }}
          />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#333",
            }}
          >
            {fig.nombre}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FiguritaCard;
