const mongoose = require("mongoose");

const entregaSchema = new mongoose.Schema({
  placa: String,
  entregador: String,
  fornecedor: String,
  nota: String,
  horario: String,
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Entrega", entregaSchema);
