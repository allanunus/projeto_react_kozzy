const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão com MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://allanunus_isamon:R9wFDYqvIxTjqoyH@appkozzycontatos.11nsii8.mongodb.net/portaria_db?appName=appkozzycontatos"
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

// Rotas
app.use("/auth", require("./routes/authRoutes"));
app.use("/funcionarios", require("./routes/funcRoutes"));
app.use("/entregas", require("./routes/entregaRoutes")); // <-- ADICIONADA

// Rota inicial teste
app.get("/", (req, res) => {
  res.send("API está rodando!");
});

// Subir servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
