import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import User from "./models/User.js";

const app = express();
const PORT = 5000;

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DB ---------- */
connectDB();

/* ---------- GET all users ---------- */
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/* ---------- GET single user ---------- */
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

/* ---------- POST create user ---------- */
app.post("/api/users", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  try {
    const user = await User.create({ name, email, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- PUT full replace ---------- */
app.put("/api/users/:id", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      error: "PUT requires full user object"
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true, overwrite: true }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

/* ---------- PATCH partial update ---------- */
app.patch("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

/* ---------- DELETE ---------- */
app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(204).send();
});

/* ---------- Server ---------- */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
