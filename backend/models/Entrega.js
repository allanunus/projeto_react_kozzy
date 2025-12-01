const mongoose = require("mongoose");

const EntregaSchema = new mongoose.Schema({
  placa: String,
  entregador: String,
  fornecedor: String,
  nota: String,
  horario: String
});

module.exports = mongoose.model("Entrega", EntregaSchema);
