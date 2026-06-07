// src/controllers/userController.js
import * as store from "../data/store.js";

// GET /users
export const getAllUsers = (req, res) => {
  const { search } = req.query;
  let users = store.getAll();

  if (search) {
    const q = search.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }

  res.json(users);
};

// GET /users/:id
export const getUserById = (req, res) => {
  const user = store.getById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// POST /users
export const createUser = (req, res) => {
  const { name, username, email, phone, website, company } = req.body;

  // Basic validation
  if (!name || !username || !email || !phone) {
    return res.status(400).json({ message: "name, username, email and phone are required" });
  }

  const user = store.create({ name, username, email, phone, website: website || "", company: company || { name: "" } });
  res.status(201).json(user);
};

// PUT /users/:id
export const updateUser = (req, res) => {
  const user = store.update(Number(req.params.id), req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// DELETE /users/:id
export const deleteUser = (req, res) => {
  const deleted = store.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};
