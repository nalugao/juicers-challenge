import Patient from "../models/Patient.js";

export const createOrUpdatePatient = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      birthDate,
      biologicalSex,
      weight,
      height,
      cycleTime,
      substances,
      healthConditions,
    } = req.body;

    const patient = await Patient.findOneAndUpdate(
      { userId },
      {
        birthDate,
        biologicalSex,
        weight,
        height,
        cycleTime,
        substances,
        healthConditions,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

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

    const patient = await Patient.findOne({ userId }).populate(
      "userId",
      "name email role"
    );

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