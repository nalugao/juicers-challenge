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
      tgo: Number,
      tgp: Number,
      ggt: Number,
      hdl: Number,
      ldl: Number,
      triglycerides: Number,
      testosteroneTotal: Number,
      testosteroneFree: Number,
      creatinine: Number,
      urea: Number,
      glucose: Number,
      hematocrit: Number,
      hemoglobin: Number,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exam", examSchema);