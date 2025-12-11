import React, { useState } from "react";
import api, { registerUser } from "../services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [repitaSenha, setRepitaSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      return alert("Preencha todos os campoes obrigatórios!");
    }

    if (senha !== repitaSenha) {
      return alert("As senhas não coincidem!");
    }

    try {
      const response = await registerUser({
        nome,
        email,
        senha,
      });

      alert("usuário cadastrado com sucesso!");
      console.log("Resposta do backend:", response.data);
    } catch (err) {
      let mensagemErro = "Erro desconhecido. Por favor, tente novamente.";

      if (err.response && err.response.data && err.response.data.error) {
        mensagemErro = err.response.data.error;
      } else if (err.message && err.message.includes("Network Error")) {
        mensagemErro =
          "Erro de conexão. Verifique se o servidor está ativo na porta 5000.";
      }

      console.log("Erro do Backend/Axios:", err.response?.data || err);
      alert(`❌ Erro no Cadastro:\n\n${mensagemErro}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* PAINEL ESQUERDO */}
      <div style={styles.leftPainel}>
        <img
          src="Logo_Kozzy.png"
          alt="Kozzy"
          style={{ width: 120, marginBottom: 20 }}
        />

        <h1 style={styles.title}>Olá, seja bem-vindo(a) novo usuário!</h1>

        <p style={styles.subTitle}>
          Crie a sua conta nova no SA para utilizar as funcionalidades do APP!
        </p>
      </div>

      {/* PAINEL DIREITO */}
      <div style={styles.rightPainel}>
        <h2 style={styles.titleCadastro}>Crie a sua conta</h2>

        <input
          type="text"
          placeholder="Nome"
          style={styles.input}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Telefone"
          style={styles.input}
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repita a senha"
          style={styles.input}
          value={repitaSenha}
          onChange={(e) => setRepitaSenha(e.target.value)}
        />

        <button style={styles.btnAvancar} onClick={handleRegister}>
          <span style={styles.btnText}>Avançar</span>
        </button>
      </div>
    </div>
  );
}

// ====================== ESTILO (convertido do React Native para Web) ======================

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    flexDirection: "row",
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
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
    maxWidth: "70%",
  },

  subTitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    maxWidth: "70%",
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

  titleCadastro: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    width: "70%",
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    border: "1px solid #bbb",
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
