import mongoose from "mongoose";

const waecQuestionSchema = new mongoose.Schema(
  {
    exam: { type: String, default: "WAEC" },
    subject: { type: String, required: true, trim: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
    year: String,
    topic: String,
  },
  { timestamps: true },
);

export const WaecQuestion = mongoose.model("WaecQuestion", waecQuestionSchema);
