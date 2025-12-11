import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Funcionarios from "./pages/Funcionarios";
import Entregas from "./pages/Entregas";
import NovoFuncionario from "./pages/NovoFuncionario";

import Sidebar from "./components/Sidebar";

// Layout que engloba sidebar + conteudo
function LayoutWithSidebar({ children }) {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Telas sem sidebar */}
        <Route path="/" element={<Login />} />

        {/* Telas COM sidebar */}
        <Route
          path="/home"
          element={
            <LayoutWithSidebar>
              <Home />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/cadastro"
          element={
            <LayoutWithSidebar>
              <Cadastro />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/funcionarios"
          element={
            <LayoutWithSidebar>
              <Funcionarios />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/entregas"
          element={
            <LayoutWithSidebar>
              <Entregas />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/novo"
          element={
            <LayoutWithSidebar>
              <NovoFuncionario />
            </LayoutWithSidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
