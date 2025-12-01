import React, { useEffect, useState } from "react";
import { FaBars, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  async function carregarRegistros() {
    const res = await axios.get("http://localhost:5000/funcionarios");
    setRegistros(res.data);
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  async function deletar(id) {
    await axios.delete(`http://localhost:5000/funcionarios/${id}`);
    carregarRegistros();
  }

  const filtrados = registros.filter((item) => {
    const texto = filtro.toLowerCase();
    return (
      item.nome.toLowerCase().includes(texto) ||
      item.data.includes(texto) ||
      item.hora.includes(texto)
    );
  });

  return (
    <div className="w-full h-screen flex bg-[#E5E5E5] relative overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1A2B4C] text-white p-6 flex flex-col gap-6 transition-all duration-300 shadow-xl
        ${menuOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        <h2 className="text-2xl font-bold mb-4">Menu</h2>

        <button
          onClick={() => navigate("/funcionarios")}
          className="text-left text-lg hover:underline"
        >
          Registrar Funcionário
        </button>

        <button
          onClick={() => navigate("/entregas")}
          className="text-left text-lg hover:underline"
        >
          Registro de Entregas
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-left text-lg hover:underline text-red-400"
        >
          Sair
        </button>
      </div>

      {/* Top bar */}
      <div className="w-full flex items-center bg-white shadow-md p-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-[#1A2B4C]"
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-semibold ml-4 text-[#1A2B4C]">
          Registros de Entradas
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="w-full p-10">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

          {/* Filtro */}
          <input
            type="text"
            placeholder="Filtrar por nome, data ou hora..."
            className="w-full border px-4 py-2 rounded-xl outline-none mb-4"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <h2 className="text-xl font-semibold mb-4 text-[#1A2B4C]">
            Lista de Registros
          </h2>

          {/* Tabela */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-[#1A2B4C] text-white">
                <th className="p-3">Nome</th>
                <th className="p-3">Data</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                filtrados.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{item.nome}</td>
                    <td className="p-3">{item.data}</td>
                    <td className="p-3">{item.hora}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deletar(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
