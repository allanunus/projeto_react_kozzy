import React, { useEffect, useState } from "react";
import {
  getFuncionarios,
  createFuncionario,
  deleteFuncionario,
} from "../services/api";

export default function Funcionarios() {
  const [lista, setLista] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [horaFiltro, setHoraFiltro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    documento: "",
    empresa: "",
    tipo: "entrada",
    horario: "",
  });

  // ---------------------------
  // Carregar lista da API
  // ---------------------------
  const carregar = async () => {
    try {
      const res = await getFuncionarios();
      setLista(res.data);
    } catch (error) {
      console.log("Erro ao carregar funcionários:", error);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  // ---------------------------
  // Enviar registro
  // ---------------------------
  const enviar = async (e) => {
    e.preventDefault();

    try {
      await createFuncionario(form);
      setForm({
        nome: "",
        documento: "",
        empresa: "",
        tipo: "entrada",
        horario: "",
      });
      carregar();
    } catch (error) {
      console.log("Erro ao registrar funcionário:", error);
    }
  };

  // ---------------------------
  // Deletar registro
  // ---------------------------
  const remover = async (id) => {
    try {
      await deleteFuncionario(id);
      carregar();
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  };

  // ---------------------------
  // FILTROS
  // ---------------------------
  const filtrado = lista.filter((item) => {
    const nomeMatch =
      filtro === "" ||
      item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      item.empresa.toLowerCase().includes(filtro.toLowerCase());

    const dataMatch =
      dataFiltro === "" || item.horario.startsWith(dataFiltro);

    const horaMatch =
      horaFiltro === "" || item.horario.includes(horaFiltro);

    return nomeMatch && dataMatch && horaMatch;
  });

  return (
    <div className="w-full min-h-screen bg-[#E5E5E5] p-8">

      {/* FORMULÁRIO DE REGISTRO */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-[#1A2B4C] mb-4">
          Registrar Funcionário
        </h2>

        <form onSubmit={enviar} className="grid grid-cols-2 gap-4">

          <input
            className="p-3 border rounded-lg"
            placeholder="Nome do Funcionário"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="Documento"
            value={form.documento}
            onChange={(e) =>
              setForm({ ...form, documento: e.target.value })
            }
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="Empresa"
            value={form.empresa}
            onChange={(e) => setForm({ ...form, empresa: e.target.value })}
          />

          <select
            className="p-3 border rounded-lg"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <input
            type="datetime-local"
            className="p-3 border rounded-lg col-span-2"
            value={form.horario}
            onChange={(e) =>
              setForm({ ...form, horario: e.target.value })
            }
          />

          <button
            className="col-span-2 bg-[#1A2B4C] hover:bg-[#142036] text-white p-3 rounded-lg"
            type="submit"
          >
            Registrar
          </button>
        </form>
      </div>

      {/* FILTROS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#1A2B4C] mb-4">
          Filtrar
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            className="p-3 border rounded-lg"
            placeholder="Buscar nome / empresa"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <input
            type="date"
            className="p-3 border rounded-lg"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
          />

          <input
            type="time"
            className="p-3 border rounded-lg"
            value={horaFiltro}
            onChange={(e) => setHoraFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-[#1A2B4C] mb-4">
          Funcionários Registrados
        </h2>

        {filtrado.length === 0 && <p>Nenhum registro encontrado.</p>}

        <div className="flex flex-col gap-3">
          {filtrado.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg flex justify-between items-center bg-gray-50"
            >
              <div>
                <p><b>Nome:</b> {item.nome}</p>
                <p><b>Documento:</b> {item.documento}</p>
                <p><b>Empresa:</b> {item.empresa}</p>
                <p><b>Tipo:</b> {item.tipo}</p>
                <p><b>Horário:</b> {item.horario}</p>
              </div>

              <button
                onClick={() => remover(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
