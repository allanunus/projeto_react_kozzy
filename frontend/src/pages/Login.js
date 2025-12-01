import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Logando...", email, senha);
  };

  return (
    <div className="w-full h-screen flex bg-[#E5E5E5]">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#7D7D7D] flex flex-col items-center justify-center text-white p-10">
        <img src="/logo.png" alt="Kozzy" className="w-40 mb-6" />
        <h1 className="text-3xl font-semibold mb-4">Olá, seja bem‑vindo novamente!</h1>
        <p className="text-center text-lg w-3/4">Conecte‑se à sua conta para continuar e utilizar as funcionalidades do APP!</p>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold mb-8">Faça login no SA</h2>

        <div className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl p-3 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="border rounded-xl p-3 text-lg"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="text-sm text-blue-600 w-fit">Esqueci a senha.</button>

          <button
            onClick={handleLogin}
            className="bg-[#8C1B1B] text-white p-3 rounded-xl text-lg mt-2"
          >
            Avançar
          </button>

          <button className="text-sm text-blue-600 mt-4 w-fit">
            Não possuo login
          </button>
        </div>
      </div>
    </div>
  );
}
