// src/server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ message: "User API is running" }));

// Routes
app.use("/users", userRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
