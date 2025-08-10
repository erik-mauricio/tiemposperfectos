import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // make sure your MONGODB_URI is loaded

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


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
      messages: [
        {
          speaker: {
            type: String,
            enum: ["ai", "student"],
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          turnNumber: Number,
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      status: {
        type: String,
        enum: ["active", "completed", "timeout", "ended"],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("Conversation", conversationSchema);
  
