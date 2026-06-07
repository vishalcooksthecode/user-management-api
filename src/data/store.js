// src/data/store.js
// In-memory store seeded from users.json — persists during server lifetime

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(readFileSync(join(__dirname, "users.json"), "utf-8"));

// In-memory users array
let users = [...seed];
let nextId = users.length + 1;

export const getAll    = ()       => users;
export const getById   = (id)     => users.find((u) => u.id === id);
export const create    = (data)   => {
  const user = { id: nextId++, ...data };
  users.push(user);
  return user;
};
export const update    = (id, data) => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...data, id };
  return users[idx];
};
export const remove    = (id)     => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};
