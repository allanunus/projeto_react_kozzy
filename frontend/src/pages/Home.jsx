import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cores
const PRIMARY_COLOR = "#2B3D52";
const DISTRIBUIDORA_COLOR = "#D63434";
const CREATE_BUTTON_COLOR = "#963232";
const EDIT_BUTTON_COLOR = "#84786F";
const TEXT_COLOR = "#1B202A";
const BACKGROUND_COLOR = "#E5E5E5";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  // Função para carregar registros (apenas do localStorage)
  async function carregarRegistros() {
    const storedRegistros =
      JSON.parse(localStorage.getItem("registrosPortaria")) || [];

    setRegistros(storedRegistros);
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  async function deletar(id) {
    // Lógica de exclusão no localStorage
    const storedRegistros =
      JSON.parse(localStorage.getItem("registrosPortaria")) || [];
    const newRegistros = storedRegistros.filter((item) => item._id !== id);
    localStorage.setItem("registrosPortaria", JSON.stringify(newRegistros));

    console.log(`Deletando registro com ID: ${id}`);

    // Recarrega a lista
    carregarRegistros();
  }

  // Lógica de filtro (Adicionando o filtro por tipoPessoa)
  const filtrados = registros.filter((item) => {
    const texto = filtro.toLowerCase();
    return (
      item.nome.toLowerCase().includes(texto) ||
      item.data.includes(texto) ||
      item.hora.includes(texto) ||
      item.placa.toLowerCase().includes(texto) ||
      item.status.toLowerCase().includes(texto) ||
      (item.tipoPessoa && item.tipoPessoa.toLowerCase().includes(texto))
    );
  });

  // Função auxiliar para obter estilos de status
  const getStatusStyles = (status) => {
    if (status === "Liberado") {
      return styles.statusLiberado;
    } else if (status === "Pendente") {
      return styles.statusPendente;
    }
    return {};
  };

  return (
    <div style={styles.container}>
      {/* Sidebar (RN) */}
      <div
        style={{
          ...styles.sidebar,
          width: menuOpen ? 230 : 0,
          paddingLeft: menuOpen ? 16 : 0,
          paddingRight: menuOpen ? 16 : 0,
        }}
      >
        {/* Conteúdo do Menu */}
        <div style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.3s" }}>
          {/* sidebarUser (RN) */}
          <div style={styles.sidebarUser}>
            {/* userAvatar (RN) */}
            <div style={styles.userAvatar}>
              <FaUserCircle size={48} color="rgba(255,255,255,0.7)" />
            </div>
            <div>
              {/* userName (RN) */}
              <p style={styles.userName}>Usuário Portaria</p>
              {/* userRole (RN) */}
              <p style={styles.userRole}>Portaria</p>
            </div>
          </div>

          {/* sidebarMenu (RN) */}
          <nav>
            {/* Item: Registros */}
            <button
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
              style={styles.menuItemButton}
            >
              <FaBars size={16} color="white" />
              <span style={styles.menuItemText}>Registros</span>
            </button>

            {/* Item: Novo Registro */}
            <button
              onClick={() => {
                navigate("/novo"); // Rota para Novo Registro
                setMenuOpen(false);
              }}
              style={styles.menuItemButton}
            >
              <FaPlus size={16} color="white" />
              <span style={styles.menuItemText}>Novo Registro</span>
            </button>

            {/* 🚨 NOVO ITEM: SAIR DA CONTA (Adicionado ao nav) */}
            <button
              onClick={() => {
                navigate("/"); // Redireciona para o Login
                setMenuOpen(false);
              }}
              style={styles.menuItemButton}
            >
              <FaSignOutAlt size={16} color="white" />
              <span style={styles.menuItemText}>Sair da Conta</span>
            </button>
            {/* 🚨 FIM NOVO ITEM */}
          </nav>
        </div>

        {/* ❌ LOGOUT ANTERIORMENTE AQUI FOI REMOVIDO para evitar duplicidade */}
        {/* <div style={styles.logoutContainer}> ... </div> */}
      </div>

      {/* Conteúdo Principal */}
      <div style={{ ...styles.contentWrapper, marginLeft: menuOpen ? 230 : 0 }}>
        {/* header (RN) */}
        <header style={styles.header}>
          {/* menuButton (RN) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.menuButton}
          >
            <FaBars color="white" size={24} />
          </button>

          {/* headerTitle (RN) */}
          <h1 style={styles.headerTitle}>Registros de Portaria</h1>

          {/* searchBox (RN) */}
          <div style={styles.searchBox}>
            {/* searchInput (RN) */}
            <input
              type="text"
              placeholder="Filtrar..."
              style={styles.searchInput}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          {/* logoContainer (RN) */}
          <div style={styles.logoContainer}>
            {/* kozzyText (RN) */}
            <p style={styles.kozzyText}>KOZZY</p>
            {/* distribuidoraText (RN) */}
            <p style={styles.distribuidoraText}>DISTRIBUIDORA</p>
          </div>
        </header>

        {/* contentContainer (RN) */}
        <main style={styles.contentContainer}>
          {/* registrosHeader (RN) */}
          <div style={styles.registrosHeader}>
            {/* registrosTitle (RN) */}
            <h2 style={styles.registrosTitle}>Registros de Entradas</h2>

            {/* createEntryButton (RN) */}
            <button
              onClick={() => navigate("/novo")}
              style={styles.createEntryButton}
            >
              <FaPlus color="white" size={16} />
              {/* createEntryButtonText (RN) */}
              <span style={styles.createEntryButtonText}>Novo Registro</span>
            </button>
          </div>

          {/* tableContainer (RN) */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              {/* tableHeaderRow (RN) */}
              <thead>
                <tr style={styles.tableHeaderRow}>
                  {/* Data */}
                  <th style={{ ...styles.tableHeaderCell, ...styles.cellDate }}>
                    Data
                  </th>
                  {/* Nome */}
                  <th style={{ ...styles.tableHeaderCell, ...styles.cellName }}>
                    Nome
                  </th>
                  {/* TIPO DE PESSOA */}
                  <th style={{ ...styles.tableHeaderCell, ...styles.cellTipo }}>
                    Tipo
                  </th>
                  {/* Status */}
                  <th
                    style={{ ...styles.tableHeaderCell, ...styles.cellStatus }}
                  >
                    Status
                  </th>
                  {/* Hora */}
                  <th style={{ ...styles.tableHeaderCell, ...styles.cellTime }}>
                    Hora
                  </th>
                  {/* Placa */}
                  <th
                    style={{ ...styles.tableHeaderCell, ...styles.cellPlate }}
                  >
                    Placa
                  </th>
                  {/* Ações */}
                  <th style={{ ...styles.tableHeaderCell, ...styles.cellEdit }}>
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtrados.length === 0 ? (
                  <tr>
                    {/* ColSpan ajustado para 7 colunas */}
                    <td colSpan="7" style={styles.noRecordsCell}>
                      Nenhum registro encontrado
                    </td>
                  </tr>
                ) : (
                  filtrados.map((item, index) => (
                    <tr
                      key={item._id}
                      style={{
                        ...styles.tableRow,
                        borderBottom:
                          index === filtrados.length - 1
                            ? "none"
                            : styles.tableRow.borderBottom,
                      }}
                    >
                      {/* Data */}
                      <td style={{ ...styles.tableCell, ...styles.cellDate }}>
                        {item.data}
                      </td>
                      {/* Nome */}
                      <td style={{ ...styles.tableCell, ...styles.cellName }}>
                        {item.nome}
                      </td>

                      {/* TIPO DE PESSOA */}
                      <td style={{ ...styles.tableCell, ...styles.cellTipo }}>
                        {item.tipoPessoa || "N/A"}
                      </td>

                      {/* Status */}
                      <td
                        style={{
                          ...styles.tableCell,
                          ...styles.cellStatus,
                          padding: 0,
                        }}
                      >
                        <div
                          style={{
                            ...styles.statusBadge,
                            ...getStatusStyles(item.status),
                          }}
                        >
                          <span style={styles.statusText}>{item.status}</span>
                        </div>
                      </td>

                      {/* Hora */}
                      <td style={{ ...styles.tableCell, ...styles.cellTime }}>
                        {item.hora}
                      </td>

                      {/* Placa */}
                      <td style={{ ...styles.tableCell, ...styles.cellPlate }}>
                        {item.placa}
                      </td>

                      {/* Ações */}
                      <td
                        style={{
                          ...styles.tableCell,
                          ...styles.cellEdit,
                          padding: 0,
                        }}
                      >
                        <button
                          onClick={() =>
                            console.log(`Editando registro: ${item._id}`)
                          }
                          style={styles.editButton}
                        >
                          <FaEdit color="white" size={16} />
                          <span style={styles.editButtonText}>Editar</span>
                        </button>
                        {/* Botão Deletar */}
                        <button
                          onClick={() => deletar(item._id)}
                          style={{
                            ...styles.editButton,
                            backgroundColor: "#D63434",
                            marginLeft: 8,
                          }}
                        >
                          <FaTrash color="white" size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

// Estilos CSS-in-JS (equivalente ao styles do React Native)
const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "white",
    position: "relative",
  },

  // Conteúdo principal (wrapper) que se move com o menu
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    transition: "margin-left 0.3s",
    backgroundColor: BACKGROUND_COLOR, // Fundo principal da página
  },

  // Header (Cabeçalho)
  header: {
    backgroundColor: PRIMARY_COLOR,
    height: 56,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: "space-between",
    position: "relative",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },

  menuButton: {
    padding: 6,
    marginRight: 12,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },

  searchBox: {
    backgroundColor: "white",
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    width: 180, // Aumentado um pouco para caber
    height: 32,
    marginRight: 12,
  },

  searchInput: {
    marginLeft: 6,
    fontSize: 16,
    color: PRIMARY_COLOR,
    flex: 1,
    height: 32,
    border: "none",
    outline: "none",
  },

  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: 100,
  },

  kozzyText: {
    color: "white",
    fontWeight: "900",
    fontSize: 22,
    lineHeight: "18px",
  },

  distribuidoraText: {
    color: DISTRIBUIDORA_COLOR,
    fontSize: 14,
    fontWeight: "600",
  },

  // Sidebar (Menu Lateral)
  sidebar: {
    position: "fixed",
    width: 0,
    height: "100%",
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 40,
    overflow: "hidden",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Alterado para acomodar o nav
    transition: "width 0.3s",
    boxShadow: "4px 0 6px rgba(0,0,0,0.2)",
  },

  sidebarUser: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 12,
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    marginBottom: 20,
    alignItems: "center",
  },

  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginRight: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  userName: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
  },

  userRole: {
    color: "white",
    fontSize: 12,
    opacity: 0.7,
  },

  // Menu Items
  menuItemButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    padding: 0,
  },

  menuItemText: {
    color: "white",
    fontSize: 16,
    marginLeft: 12,
  },

  // Conteúdo da Tabela
  contentContainer: {
    padding: 20,
    flex: 1,
  },

  registrosHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  registrosTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: TEXT_COLOR,
  },

  createEntryButton: {
    backgroundColor: CREATE_BUTTON_COLOR,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.15s",
  },

  createEntryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },

  tableContainer: {
    border: `1px solid ${PRIMARY_COLOR}`,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },

  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottom: `1px solid ${PRIMARY_COLOR}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    width: "100%",
  },

  tableHeaderCell: {
    fontWeight: "700",
    color: PRIMARY_COLOR,
    padding: 4,
    textAlign: "left",
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: `1px solid ${PRIMARY_COLOR}`,
    alignItems: "center",
    backgroundColor: "white",
    transition: "background-color 0.1s",
  },

  noRecordsCell: {
    padding: 15,
    textAlign: "center",
    color: "#888",
    backgroundColor: "white",
  },

  tableCell: {
    color: "black",
    fontWeight: "400",
    padding: 4,
  },

  // Definição de Flex para 7 Colunas de Dados + 1 Ações
  cellDate: {
    flex: 1.1,
  },
  cellName: {
    flex: 1.5,
  },
  cellTipo: {
    flex: 1.3,
  },
  cellStatus: {
    flex: 1.2,
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cellTime: {
    flex: 1.1,
    textAlign: "center",
  },
  cellPlate: {
    flex: 1.2,
    textAlign: "center",
  },
  cellEdit: {
    flex: 1.6,
    textAlign: "right",
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // Badges de Status
  statusBadge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    justifyContent: "center",
    width: "fit-content",
  },

  statusLiberado: {
    backgroundColor: "#2AA852",
  },

  statusPendente: {
    backgroundColor: "#7E99B3",
  },

  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  // Botões
  editButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: EDIT_BUTTON_COLOR,
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.15s",
  },

  editButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 14,
  },
};
