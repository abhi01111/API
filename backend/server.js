import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 5000;

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());

/* ---------- In-memory data store ---------- */
let users = [];

/* ---------- GET all users ---------- */
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

/* ---------- GET single user ---------- */
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

/* ---------- POST create user ---------- */
app.post("/api/users", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    role: role || "User",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

/* ---------- PUT full replace ---------- */
app.put("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      error: "PUT requires full user object"
    });
  }

  users[index] = {
    id: users[index].id,
    name,
    email,
    role,
    createdAt: users[index].createdAt,
    updatedAt: new Date()
  };

  res.status(200).json(users[index]);
});

/* ---------- PATCH partial update ---------- */
app.patch("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  Object.keys(req.body).forEach(key => {
    user[key] = req.body[key];
  });

  user.updatedAt = new Date();

  res.status(200).json(user);
});

/* ---------- DELETE user ---------- */
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).send();
});

/* ---------- Server ---------- */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
