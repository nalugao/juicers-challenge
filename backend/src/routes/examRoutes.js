import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createExam,
  getMyExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controllers/examController.js";

const router = Router();

router.post("/", authMiddleware, createExam);
router.get("/", authMiddleware, getMyExams);
router.get("/:id", authMiddleware, getExamById);
router.put("/:id", authMiddleware, updateExam);
router.delete("/:id", authMiddleware, deleteExam);

export default router;