import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NovoFuncionario from "./pages/NovoFuncionario";

import RegistroEntradas from "./pages/RegistroEntradas";
import RegistroEntregas from "./pages/RegistroEntregas";

import Sidebar from "./components/Sidebar";

// Layout que engloba sidebar + conteudo
function LayoutWithSidebar({ children }) {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Telas sem sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Register />} />

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
          path="/novo"
          element={
            <LayoutWithSidebar>
              <NovoFuncionario />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/registro-entradas"
          element={
            <LayoutWithSidebar>
              <RegistroEntradas />
            </LayoutWithSidebar>
          }
        />

        <Route
          path="/registro-entregas"
          element={
            <LayoutWithSidebar>
              <RegistroEntregas />
            </LayoutWithSidebar>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
