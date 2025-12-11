const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!passwordRegex.test(senha)) {
    return res.status(400).json({
      error:
        "A senha deve ter no mínimo 8 caracteres, incluindo letra, número e um caractere especial.",
    });
  }

  const senhaCript = await bcrypt.hash(senha, 10);

  try {
    await User.create({ nome, email, senha: senhaCript });
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email já registrado. Tente fazer login." });
    }

    console.error("Erro no cadastro:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao registrar usuário." });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Credenciais inválidas. Verifique o email e a senha." });
    }

    const senhaMatch = await bcrypt.compare(senha, user.senha);
    if (!senhaMatch) {
      return res
        .status(401)
        .json({ error: "Credenciais inválidas. Verifique o email e a senha." });
    }

    const token = jwt.sign({ id: user._id, nome: user.nome }, "segredo", {
      expiresIn: "2h",
    });

    res.json({ token, nome: user.nome, id: user._id });
  } catch (error) {
    console.error("Erro no login:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor durante o login." });
  }
});

module.exports = router;
