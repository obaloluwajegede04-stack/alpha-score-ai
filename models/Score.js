import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: String,
      required: true,
      enum: ["WAEC", "JAMB", "NECO", "GCE"],
    },
    score: { type: Number, required: true, min: 0 },
    maxScore: { type: Number, default: 0 },
    subject: { type: String, trim: true },
    quizDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

scoreSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const Score = mongoose.model("Score", scoreSchema);
