import crypto from "crypto";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import DoctorInvite from "../models/DoctorInvite.js";

export const createDoctorInvite = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Apenas médicos podem enviar convites",
      });
    }

    const { patientName, patientEmail } = req.body;

    if (!patientName || !patientEmail) {
      return res.status(400).json({
        message: "Nome e e-mail do paciente são obrigatórios",
      });
    }

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({
        message: "Perfil de médico não encontrado",
      });
    }

    const token = crypto.randomBytes(4).toString("hex").toUpperCase();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = await DoctorInvite.create({
      doctorId: doctor._id,
      patientName,
      patientEmail,
      token,
      expiresAt,
    });

    const inviteLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/cadastro/${token}`;

    return res.status(201).json({
      message: "Convite criado com sucesso",
      invite: {
        id: invite._id,
        patientName: invite.patientName,
        patientEmail: invite.patientEmail,
        token: invite.token,
        status: invite.status,
        expiresAt: invite.expiresAt,
        inviteLink,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyDoctorPatients = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Apenas médicos podem acessar esta lista",
      });
    }

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({
        message: "Perfil de médico não encontrado",
      });
    }

    const patients = await Patient.find({ doctorId: doctor._id })
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      patients,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getInviteByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await DoctorInvite.findOne({ token }).populate({
      path: "doctorId",
      populate: {
        path: "userId",
        select: "name email role",
      },
    });

    if (!invite) {
      return res.status(404).json({
        message: "Convite não encontrado",
      });
    }

    if (invite.status !== "pending") {
      return res.status(400).json({
        message: "Este convite não está mais disponível",
      });
    }

    if (invite.expiresAt < new Date()) {
      invite.status = "expired";
      await invite.save();

      return res.status(400).json({
        message: "Convite expirado",
      });
    }

    return res.status(200).json({
      invite: {
        id: invite._id,
        patientName: invite.patientName,
        patientEmail: invite.patientEmail,
        token: invite.token,
        status: invite.status,
        expiresAt: invite.expiresAt,
        doctor: {
          id: invite.doctorId._id,
          name: invite.doctorId.userId.name,
          email: invite.doctorId.userId.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { token } = req.params;

    if (req.user.role !== "patient") {
      return res.status(403).json({
        message: "Apenas pacientes podem aceitar convites",
      });
    }

    const invite = await DoctorInvite.findOne({ token });

    if (!invite) {
      return res.status(404).json({
        message: "Convite não encontrado",
      });
    }

    if (invite.status !== "pending") {
      return res.status(400).json({
        message: "Este convite não está mais disponível",
      });
    }

    if (invite.expiresAt < new Date()) {
      invite.status = "expired";
      await invite.save();

      return res.status(400).json({
        message: "Convite expirado",
      });
    }

    const patient = await Patient.findOne({ userId });

    if (!patient) {
      return res.status(404).json({
        message: "Perfil de paciente não encontrado. Complete o onboarding antes de aceitar o convite.",
      });
    }

    if (patient.doctorId) {
      return res.status(400).json({
        message: "Este paciente já possui médico vinculado",
      });
    }

    patient.doctorId = invite.doctorId;
    await patient.save();

    invite.status = "accepted";
    invite.acceptedAt = new Date();
    await invite.save();

    return res.status(200).json({
      message: "Convite aceito com sucesso",
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};