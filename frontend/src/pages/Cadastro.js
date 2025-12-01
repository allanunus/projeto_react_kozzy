import React, { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [repitaSenha, setRepitaSenha] = useState("");

  const handleRegister = () => {
    console.log("Cadastrando usuário...", { nome, email, telefone, senha });
  };

  return (
    <div className="w-full h-screen flex bg-[#E5E5E5]">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#7D7D7D] flex flex-col items-center justify-center text-white p-10">
        <img src="/logo.png" alt="Kozzy" className="w-40 mb-6" />
        <h1 className="text-3xl font-semibold mb-4">Olá, seja bem-vindo(a) novo usuário!</h1>
        <p className="text-center text-lg w-3/4">Crie a sua conta nova no SA para utilizar as funcionalidades do APP!</p>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold mb-8">Crie a sua conta</h2>

        <div className="flex flex-col gap-4 w-full">

          <input
            type="text"
            placeholder="Nome"
            className="border rounded-xl p-3 text-lg"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl p-3 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            className="border rounded-xl p-3 text-lg"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="border rounded-xl p-3 text-lg"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Repita a senha"
            className="border rounded-xl p-3 text-lg"
            value={repitaSenha}
            onChange={(e) => setRepitaSenha(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="bg-[#8C1B1B] text-white p-3 rounded-xl text-lg mt-2"
          >
            Avançar
          </button>

        </div>
      </div>
    </div>
  );
}