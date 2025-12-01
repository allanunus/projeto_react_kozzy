import React, { useState, useEffect } from "react";

export default function Entregas() {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({
    placa: "",
    entregador: "",
    fornecedor: "",
    nota: "",
    horario: "",
  });

  const [filtro, setFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [horaFiltro, setHoraFiltro] = useState("");

  // Carregar entregas
  const carregar = async () => {
    try {
      const res = await fetch("http://localhost:5000/entregas");
      const dados = await res.json();
      setEntregas(dados);
    } catch (err) {
      console.log("Erro ao carregar entregas", err);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  // Registrar entrega
  const enviar = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/entregas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({
        placa: "",
        entregador: "",
        fornecedor: "",
        nota: "",
        horario: "",
      });

      carregar();
    } catch (err) {
      console.log("Erro ao registrar entrega", err);
    }
  };

  const deletar = async (id) => {
    try {
      await fetch(`http://localhost:5000/entregas/${id}`, {
        method: "DELETE",
      });

      carregar();
    } catch (err) {
      console.log("Erro ao deletar entrega", err);
    }
  };

  // FILTRO
  const filtrado = entregas.filter((item) => {
    const textoMatch =
      filtro === "" ||
      item.placa.toLowerCase().includes(filtro.toLowerCase()) ||
      item.entregador.toLowerCase().includes(filtro.toLowerCase()) ||
      item.fornecedor.toLowerCase().includes(filtro.toLowerCase());

    const dataMatch =
      dataFiltro === "" || item.horario.startsWith(dataFiltro);

    const horaMatch =
      horaFiltro === "" || item.horario.includes(horaFiltro);

    return textoMatch && dataMatch && horaMatch;
  });

  return (
    <div className="w-full min-h-screen bg-[#E5E5E5] p-8">

      {/* FORMULÁRIO */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-[#1A2B4C]">
        <h2 className="text-2xl font-bold text-[#1A2B4C] mb-4">
          Registrar Entrega
        </h2>

        <form onSubmit={enviar} className="grid grid-cols-2 gap-4">

          <input
            className="p-3 border rounded-lg"
            placeholder="Placa"
            value={form.placa}
            onChange={(e) => setForm({ ...form, placa: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="Entregador"
            value={form.entregador}
            onChange={(e) => setForm({ ...form, entregador: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="Fornecedor"
            value={form.fornecedor}
            onChange={(e) => setForm({ ...form, fornecedor: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="Número da Nota"
            value={form.nota}
            onChange={(e) => setForm({ ...form, nota: e.target.value })}
          />

          <input
            type="datetime-local"
            className="p-3 border rounded-lg col-span-2"
            value={form.horario}
            onChange={(e) => setForm({ ...form, horario: e.target.value })}
          />

          <button
            className="col-span-2 bg-[#1A2B4C] hover:bg-[#142036] text-white p-3 rounded-lg font-semibold"
            type="submit"
          >
            Registrar Entrega
          </button>
        </form>
      </div>

      {/* FILTROS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-l-4 border-red-600">
        <h2 className="text-xl font-bold text-[#1A2B4C] mb-4">
          Filtrar Registros
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            className="p-3 border rounded-lg"
            placeholder="Buscar por nome / placa / fornecedor"
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
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#1A2B4C]">
        <h2 className="text-xl font-bold text-[#1A2B4C] mb-4">
          Entregas Registradas
        </h2>

        {filtrado.length === 0 && (
          <p className="text-gray-600">Nenhum registro encontrado.</p>
        )}

        <div className="flex flex-col gap-4">

          {filtrado.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
            >
              <div className="text-gray-800">
                <p><b>Placa:</b> {item.placa}</p>
                <p><b>Entregador:</b> {item.entregador}</p>
                <p><b>Fornecedor:</b> {item.fornecedor}</p>
                <p><b>Nota:</b> {item.nota}</p>
                <p><b>Horário:</b> {item.horario}</p>
              </div>

              <button
                onClick={() => deletar(item._id)}
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
