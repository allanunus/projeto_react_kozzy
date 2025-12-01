const mongoose = require("mongoose");

const FuncSchema = new mongoose.Schema({
  nome: String,
  data: String,
  hora: String,
});

module.exports = mongoose.model("Funcionario", FuncSchema);
