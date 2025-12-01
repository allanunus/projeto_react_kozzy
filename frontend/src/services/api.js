import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// FUNCIONÁRIOS
export const getFuncionarios = () => api.get("/funcionarios");
export const createFuncionario = (data) => api.post("/funcionarios", data);
export const deleteFuncionario = (id) => api.delete(`/funcionarios/${id}`);

// ENTRADAS
export const getEntradas = () => api.get("/entradas");
export const createEntrada = (data) => api.post("/entradas", data);
export const deleteEntrada = (id) => api.delete(`/entradas/${id}`);

// ENTREGAS
export const getEntregas = () => api.get("/entregas");
export const createEntrega = (data) => api.post("/entregas", data);
export const deleteEntrega = (id) => api.delete(`/entregas/${id}`);

export default api;
