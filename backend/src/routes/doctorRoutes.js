import { Router } from "express";
import {
  createDoctorInvite,
  getMyDoctorPatients,
  getMyDoctorPatientById,
  getInviteByToken,
  acceptInvite,
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/invites", authMiddleware, createDoctorInvite);

router.get("/patients", authMiddleware, getMyDoctorPatients);

router.get("/patients/:id", authMiddleware, getMyDoctorPatientById);

router.get("/invites/:token", getInviteByToken);

router.post("/invites/:token/accept", authMiddleware, acceptInvite);

export default router;