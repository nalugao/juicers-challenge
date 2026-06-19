import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    examDate: {
      type: String,
      required: true,
    },

    markers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    riskLevel: {
      type: String,
      enum: ["normal", "attention", "high"],
      default: "normal",
    },

    alerts: {
      type: [String],
      default: [],
    },

    source: {
      type: String,
      enum: ["manual", "pdf"],
      default: "manual",
    },

    originalFileName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exam", examSchema);