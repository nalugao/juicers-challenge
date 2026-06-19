import mongoose from "mongoose";

const requestedExamSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

requestedExamSchema.index(
  { doctorId: 1, patientId: 1, label: 1 },
  { unique: true }
);

export default mongoose.model("RequestedExam", requestedExamSchema);