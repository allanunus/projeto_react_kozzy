const express = require("express");
const router = express.Router();
const Funcionario = require("../models/Funcionario");

router.post("/", async (req, res) => {
  const func = await Funcionario.create(req.body);
  res.json(func);
});

router.get("/", async (req, res) => {
  const funcs = await Funcionario.find();
  res.json(funcs);
});

router.delete("/:id", async (req, res) => {
  await Funcionario.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deletado!" });
});

module.exports = router;
