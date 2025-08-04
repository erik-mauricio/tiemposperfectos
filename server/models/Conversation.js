import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: String,
    prompt: {
      text: String,
      topic: String,
      difficulty: String,
    },
    currentTurn: {
      type: Number,
      default: 1,
    },
    maxTurns: {
      type: Number,
      default: 5,
    },
    messages: [
      {
        speaker: {
          type: String,
          enum: ["ai", "student"],
        },
        message: String,
        turnNumber: Number,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "timeout"],
      default: "active",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("Conversation", conversationSchema);
