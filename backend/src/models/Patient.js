import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },

    birthDate: {
      type: String,
    },

    biologicalSex: {
      type: String,
      enum: ["female", "male", "other"],
    },

    weight: {
      type: Number,
    },

    height: {
      type: Number,
    },

    cycleTime: {
      type: String,
    },

    substances: {
      type: [String],
      default: [],
    },

    healthConditions: {
      type: [String],
      default: [],
    },

    age: {
      type: Number,
    },

    cycleStatus: {
      type: String,
    },

    weeklyDosage: {
      type: Number,
    },

    examStatus: {
      type: String,
    },

    lastExamDate: {
      type: String,
    },

    lastName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);