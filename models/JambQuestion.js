import mongoose from "mongoose";

const jambQuestionSchema = new mongoose.Schema(
  {
    exam: { type: String, default: "JAMB" },
    subject: { type: String, required: true, trim: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
    year: String,
    topic: String,
  },
  { timestamps: true },
);

export const JambQuestion = mongoose.model("JambQuestion", jambQuestionSchema);
