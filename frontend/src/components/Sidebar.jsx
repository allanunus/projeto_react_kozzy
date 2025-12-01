// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: open ? 0 : "-320px",
        width: 320,
        height: "100vh",
        background: "#0B3D91", // azul marinho
        color: "#fff",
        padding: 20,
        transition: "left 0.28s ease",
        zIndex: 1000,
        boxShadow: open ? "4px 0 20px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          color: "#fff",
          border: "none",
          fontSize: 20,
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        ✕ Fechar
      </button>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/home" style={linkStyle} onClick={onClose}>Home (Registros)</Link>
        <Link to="/funcionarios" style={linkStyle} onClick={onClose}>Registro de Funcionários</Link>
        <Link to="/entregas" style={linkStyle} onClick={onClose}>Registro de Entregas</Link>
      </nav>

      <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
        <small>Usuário: (nome)</small>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 8,
  background: "transparent",
  display: "inline-block",
};
