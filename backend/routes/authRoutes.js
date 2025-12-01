const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const senhaCript = await bcrypt.hash(senha, 10);

  try {
    await User.create({ nome, email, senha: senhaCript });
    res.json({ msg: "Usuário criado!" });
  } catch (error) {
    res.status(400).json({ error: "Email já registrado" });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  const senhaMatch = await bcrypt.compare(senha, user.senha);
  if (!senhaMatch) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user._id }, "segredo", { expiresIn: "2h" });

  res.json({ token, nome: user.nome });
});

module.exports = router;
