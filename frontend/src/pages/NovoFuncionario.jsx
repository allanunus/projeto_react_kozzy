import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaClock,
  FaBus,
  FaChevronLeft,
} from "react-icons/fa";

// Cores
const PRIMARY_COLOR = "#2B3D52";
const SAVE_BUTTON_COLOR = "#963232";
const TEXT_COLOR = "#1B202A";
const BACKGROUND_COLOR = "#E5E5E5";

export default function NovoFuncionario() {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState({
    nome: "",
    tipoPessoa: "",
    cpf: "",
    data: new Date().toISOString().split("T")[0], // Data de hoje
    hora: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }), // Hora atual
    placa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const salvarRegistro = (e) => {
    e.preventDefault();

    // 1. Criar o objeto de registro completo
    const novoRegistro = {
      _id: Date.now().toString(), // ID único para o mock
      data: new Date(registro.data).toLocaleDateString("pt-BR"), // Formata a data para a tabela
      nome: registro.nome,
      status: "Pendente", // Status inicial padrão
      hora: registro.hora,
      placa: registro.placa.toUpperCase(),
      tipoPessoa: registro.tipoPessoa,
      cpf: registro.cpf,
      // Adicione a URL da foto se for implementada
    };

    // 2. Simular salvamento no localStorage (ou API real)
    const registrosExistentes =
      JSON.parse(localStorage.getItem("registrosPortaria")) || [];
    registrosExistentes.push(novoRegistro);
    localStorage.setItem(
      "registrosPortaria",
      JSON.stringify(registrosExistentes)
    );

    alert(`Registro de ${novoRegistro.nome} salvo com sucesso!`);

    // 3. Redirecionar para a Home
    navigate("/home");
  };

  // URL da imagem de placeholder baseada na imagem fornecida
  const placeholderImage =
    "https://via.placeholder.com/100x100/CCCCCC/888888?text=Foto";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <FaChevronLeft
            size={24}
            color={PRIMARY_COLOR}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/home")}
          />
          <h2 style={styles.title}>Registro de entrada</h2>
        </div>

        <form onSubmit={salvarRegistro} style={styles.formContent}>
          <div style={styles.fieldsSection}>
            {/* Campo Nome */}
            <div style={styles.inputGroup}>
              <FaUser style={styles.icon} />
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={registro.nome}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Campo Tipo de Pessoa (Select) */}
            <div style={styles.inputGroup}>
              <FaIdCard style={styles.icon} />
              <select
                name="tipoPessoa"
                value={registro.tipoPessoa}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="" disabled>
                  Selecione o tipo de pessoa
                </option>
                <option value="Funcionario">Funcionário</option>
                <option value="Visitante">Visitante</option>
                <option value="Motorista">Motorista/Entrega</option>
              </select>
            </div>

            {/* Campo CPF */}
            <div style={styles.inputGroup}>
              <FaIdCard style={styles.icon} />
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={registro.cpf}
                onChange={handleChange}
                style={styles.input}
                maxLength={14} // Exemplo
              />
            </div>

            {/* Campo Data */}
            <div style={styles.inputGroup}>
              <FaCalendarAlt style={styles.icon} />
              <input
                type="date"
                name="data"
                value={registro.data}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Campo Entrada (Hora) */}
            <div style={styles.inputGroup}>
              <FaClock style={styles.icon} />
              <input
                type="time"
                name="hora"
                placeholder="Entrada"
                value={registro.hora}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Campo Placa */}
            <div style={styles.inputGroup}>
              <FaBus style={styles.icon} />
              <input
                type="text"
                name="placa"
                placeholder="Placa"
                value={registro.placa}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          {/* Seção da Foto */}
          <div style={styles.photoSection}>
            <div style={styles.photoBox}>
              {/*  */}
              <div style={styles.photoPlaceholder}>
                <FaUser size={60} color="#84786F" />
              </div>
            </div>
            <p style={styles.photoLabel}>Foto de identificação</p>
            <button type="submit" style={styles.saveButton}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 50,
    minHeight: "100vh",
    backgroundColor: BACKGROUND_COLOR,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    maxWidth: 600,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: 25,
  },
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${BACKGROUND_COLOR}`,
    paddingBottom: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: PRIMARY_COLOR,
    marginLeft: 15,
  },
  formContent: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "flex-start",
  },
  fieldsSection: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    border: `1px solid #ccc`,
    borderRadius: 6,
    paddingLeft: 10,
    backgroundColor: "#fff",
    height: 45,
  },
  icon: {
    color: PRIMARY_COLOR,
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 16,
    color: TEXT_COLOR,
    height: "100%",
  },
  select: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 16,
    color: TEXT_COLOR,
    height: "100%",
    appearance: "none", // Remove o estilo padrão do select em alguns navegadores
    backgroundColor: "transparent",
    paddingRight: 10,
  },
  photoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  photoBox: {
    width: 150,
    height: 150,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${PRIMARY_COLOR}`,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #84786F",
  },
  photoLabel: {
    fontSize: 14,
    color: TEXT_COLOR,
    marginBottom: 20,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: SAVE_BUTTON_COLOR,
    color: "white",
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    transition: "background-color 0.15s",
  },
};
