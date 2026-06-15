import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import examRoutes from "./routes/examRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});