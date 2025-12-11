import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// FUNCIONÁRIOS
export const getFuncionarios = () => api.get("/funcionarios");
export const createFuncionario = (data) => api.post("/funcionarios", data);
export const deleteFuncionario = (id) => api.delete(`/funcionarios/${id}`);

// ENTREGAS
export const getEntregas = () => api.get("/entregas");
export const createEntrega = (data) => api.post("/entregas", data);
export const deleteEntrega = (id) => api.delete(`/entregas/${id}`);

// (REMOVER caso não exista no backend)
// export const getEntradas = () => api.get("/entradas");

export default api;
