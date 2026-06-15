import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Rota de usuários funcionando",
  });
});

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Perfil carregado",
    user: req.user,
  });
});

export default router;