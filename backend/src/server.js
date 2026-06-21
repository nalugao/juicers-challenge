import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDatabase } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://juicers-challenge.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app");

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "API Juicers funcionando",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/doctors", doctorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});