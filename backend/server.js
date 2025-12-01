const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão com MongoDB Atlas
mongoose
  .connect("mongodb+srv://allanunus_db_user:G7wq4gCXfePQ0nza@cluster0.gsepwba.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

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
