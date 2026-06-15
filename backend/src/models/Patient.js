import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);