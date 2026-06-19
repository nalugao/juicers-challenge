import { Router } from "express";
import {
  createDoctorInvite,
  getMyDoctorPatients,
  getMyDoctorPatientById,
  getMyDoctorPatientExams,
  uploadPatientExamPdf,
  deleteDoctorPatientExam,
  getDoctorPatientFollowup,
  createClinicalNote,
  updateClinicalNote,
  deleteClinicalNote,
  toggleRequestedExam,
  getMyDoctorProfile,
  updateMyDoctorProfile,
  getInviteByToken,
  acceptInvite,
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadPdf } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, getMyDoctorProfile);
router.put("/me", authMiddleware, updateMyDoctorProfile);

router.post("/invites", authMiddleware, createDoctorInvite);

router.get("/patients", authMiddleware, getMyDoctorPatients);
router.get("/patients/:id", authMiddleware, getMyDoctorPatientById);
router.get("/patients/:id/exams", authMiddleware, getMyDoctorPatientExams);

router.post(
  "/patients/:id/exams/upload",
  authMiddleware,
  uploadPdf.single("examPdf"),
  uploadPatientExamPdf
);

router.delete(
  "/patients/:patientId/exams/:examId",
  authMiddleware,
  deleteDoctorPatientExam
);

router.get("/patients/:id/followup", authMiddleware, getDoctorPatientFollowup);
router.post("/patients/:id/notes", authMiddleware, createClinicalNote);
router.post("/patients/:id/requested-exams", authMiddleware, toggleRequestedExam);

router.put("/notes/:noteId", authMiddleware, updateClinicalNote);
router.delete("/notes/:noteId", authMiddleware, deleteClinicalNote);

router.get("/invites/:token", getInviteByToken);
router.post("/invites/:token/accept", authMiddleware, acceptInvite);

export default router;