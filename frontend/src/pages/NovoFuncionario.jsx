import { useEffect, useState } from "react";
import { getFuncionarios, createFuncionario, deleteFuncionario } from "../services/api";

export default function NovoFuncionario() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    cpf: "",
  });

  // Carregar lista
  async function carregarFuncionarios() {
    try {
      const resposta = await getFuncionarios();
      setLista(resposta.data);
    } catch (erro) {
      console.log("Erro ao carregar funcionários:", erro);
    }
  }

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  // Criar funcionário
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createFuncionario(form);
      setForm({ nome: "", cargo: "", cpf: "" });
      carregarFuncionarios();
    } catch (erro) {
      console.log("Erro ao criar funcionário:", erro);
    }
  }

  // Excluir
  async function handleDelete(id) {
    try {
      await deleteFuncionario(id);
      carregarFuncionarios();
    } catch (erro) {
      console.log("Erro ao deletar:", erro);
    }
  }

  return (
    <div>
      <h1>Novo Funcionário</h1>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>

        <div>
          <label>Cargo:</label>
          <input
            type="text"
            value={form.cargo}
            onChange={(e) => setForm({ ...form, cargo: e.target.value })}
          />
        </div>

        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {/* LISTA */}
      <h2>Funcionários Cadastrados</h2>
      <ul>
        {lista.map((f) => (
          <li key={f.id}>
            {f.nome} — {f.cargo} — {f.cpf}
            <button onClick={() => handleDelete(f.id)} style={{ marginLeft: 10 }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}