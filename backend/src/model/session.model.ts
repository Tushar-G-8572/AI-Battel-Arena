import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    solution_1: {
      type: String,
    },
    solution_2: {
      type: String,
    },
    judge: {
      solution_1_score: {
        type: Number,
        default: 0,
      },
      solution_2_score: {
        type: Number,
        default: 0,
      },
      solution_1_reasoning: {
        type: String,
      },
      solution_2_reasoning: {
        type: String,
      },
    },
    winnerModel: {
      type: String,
      enum: ["mistral", "cohere"],
    },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;