import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    if (email.trim() === "" || senha.trim() === "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_nome", response.data.nome);

      navigate("/home");
    } catch (err) {
      let mensagemErro =
        "Erro de conexão com o servidor ou credenciais inválidas.";

      if (err.response && err.response.data && err.response.data.error) {
        mensagemErro = err.response.data.error;
      }

      console.error("Erro no Login:", err.response?.data || err);
      alert(`❌ Falha no Login:\n\n${mensagemErro}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* Painel da esquerda */}
      <div style={styles.leftPainel}>
        <img
          src="Logo_Kozzy.png"
          alt="logo"
          style={{ width: 120, marginBottom: 20 }}
        />
        <h1 style={styles.title}>Sistema de Acesso</h1>
        <p style={styles.subTitle}>
          Controle completo para portarias e entregas
        </p>
      </div>

      {/* Painel da direita */}
      <div style={styles.rightPainel}>
        <h2 style={styles.titleLogin}>Faça login no SA</h2>

        <input
          type="email"
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* Links */}
        <div style={styles.linksRow}>
          <button
            style={styles.linkText}
            onClick={() => alert("Função não implementada")}
          >
            Esqueci a senha
          </button>

          <button style={styles.linkText} onClick={() => navigate("/cadastro")}>
            Não possuo login
          </button>
        </div>

        {/* Botão */}
        <button style={styles.btnAvancar} onClick={fazerLogin}>
          <span style={styles.btnText}>Avançar</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },

  leftPainel: {
    backgroundColor: "#818C92",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: "#fff",
  },

  title: {
    fontSize: 28,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "700",
  },

  subTitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  rightPainel: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titleLogin: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: "600",
  },

  input: {
    width: "70%",
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    border: "1px solid #bbb",
    fontSize: 16,
  },

  linksRow: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  linkText: {
    background: "none",
    border: "none",
    color: "#27445B",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 16,
  },

  btnAvancar: {
    width: "70%",
    backgroundColor: "#8E2927",
    padding: 14,
    borderRadius: 6,
    marginTop: 25,
    border: "none",
    cursor: "pointer",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};
