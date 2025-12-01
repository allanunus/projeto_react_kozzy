const express = require("express");
const router = express.Router();
const Entrega = require("../models/Entrega");

// Criar entrega
router.post("/", async (req, res) => {
  try {
    const entrega = await Entrega.create(req.body);
    res.json({ message: "Entrega registrada!", entrega });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar entrega" });
  }
});

// Listar todas entregas
router.get("/", async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar entregas" });
  }
});

// Deletar entrega
router.delete("/:id", async (req, res) => {
  try {
    await Entrega.findByIdAndDelete(req.params.id);
    res.json({ message: "Entrega deletada!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar entrega" });
  }
});

module.exports = router;
