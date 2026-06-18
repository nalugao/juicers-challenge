import Patient from "../models/Patient.js";

export const createOrUpdatePatient = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      birthDate,
      age,
      biologicalSex,
      weight,
      height,
      cycleStatus,
      weeklyDosage,
      cycleTime,
      examStatus,
      lastExamDate,
      lastName,
      substances,
      healthConditions,
    } = req.body;

    const patient = await Patient.findOneAndUpdate(
      { userId },
      {
        birthDate,
        age,
        lastName,
        biologicalSex,
        weight,
        height,
        cycleStatus,
        weeklyDosage,
        cycleTime,
        examStatus,
        lastExamDate,
        substances,
        healthConditions,
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      }
    )
      .populate("userId", "name email role")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email role",
        },
      });

    return res.status(200).json({
      message: "Dados do paciente salvos com sucesso",
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const patient = await Patient.findOne({ userId })
      .populate("userId", "name email role")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email role",
        },
      });

    if (!patient) {
      return res.status(404).json({
        message: "Perfil de paciente não encontrado",
      });
    }

    return res.status(200).json({
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMyPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const patient = await Patient.findOneAndDelete({ userId });

    if (!patient) {
      return res.status(404).json({
        message: "Perfil de paciente não encontrado",
      });
    }

    return res.status(200).json({
      message: "Perfil de paciente deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};