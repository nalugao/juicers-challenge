import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrUpdatePatient,
  getMyPatientProfile,
  deleteMyPatientProfile,
  getMyFollowup,
} from "../controllers/patientController.js";

const router = Router();

router.post("/", authMiddleware, createOrUpdatePatient);

router.get("/me", authMiddleware, getMyPatientProfile);

router.get("/me/followup", authMiddleware, getMyFollowup);

router.delete("/me", authMiddleware, deleteMyPatientProfile);

export default router;