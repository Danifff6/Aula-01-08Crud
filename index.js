const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para ler JSON
app.use(express.json());
app.use(express.static("public"));

// Simulando um "banco de dados" em memória
let users = [];
let currentId = 1;

// CREATE - Criar um novo usuário
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: currentId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ - Listar todos os usuários
app.get("/users", (req, res) => {
  res.json(users);
});

// READ - Buscar usuário por ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
});

// UPDATE - Atualizar um usuário
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

// DELETE - Remover um usuário
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: "Usuário não encontrado" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
