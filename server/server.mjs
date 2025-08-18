import express from 'express';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import { createServer } from "http"; 
import { Server } from "socket.io";
import OpenAI from "openai";
import Conversation from "./models/Conversation.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();


const port = process.env.PORT || 8080;
const app = express();
const apiKey = process.env.OPEN_AI_KEY;
app.use(cors());
app.use(express.json());
const server = createServer(app);
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const client = new MongoClient("mongodb://localhost:27017");
const conn = await client.connect();
const db = conn.db("app");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});


function pickRandom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

io.on('connection', (socket) => {

    socket.on('start-conversation', async (data) => {
        const session = new Conversation({
          sessionId: uuidv4(),
          userId: "temp_user_" + Math.random().toString(36),
          prompt: data,
          messages: [],
          status: "active",
          createdAt: new Date(),
        });

      
        await session.save();

        const aiOpening = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are helping a student practice speaking about: "${data.topic}" and the prompt is "${data.prompt}" with difficulty at ${data.difficulty}. Start the conversation by introducing the topic and asking an engaging question. Your text should be enough to cover 20s of real conversation time. Respond in Spanish.`,
            },
            { role: "user", content: "Begin" },
          ],
        });


        session.messages.push({
          speaker: "ai",
          content: aiOpening.choices[0].message.content,
          timestamp: new Date(),
        });
        await session.save();


        socket.emit("conversation-started", {
          sessionId: session.sessionId,
          aiMessage: aiOpening.choices[0].message.content,
          timestamp: Date.now()
        });
    });
    

    socket.on("student-response", async (data) => {
      console.log("student-response data:", JSON.stringify(data));
      const session = await Conversation.findOne({
        sessionId: data.sessionId,
      });

      if(!session){
        return;
      }

      const studentTurns = session.messages.filter(
        (m) => m.speaker === "student"
      ).length;
      if (studentTurns >= 5) {
        session.status = "ended";
        await session.save();
        socket.emit("conversation-ended", { sessionId: data.sessionId });
        return;
      }

      session.messages.push({
        speaker: "student",
        content: data.studentMessage,
        timestamp: Date.now(),
      });


      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are helping a student practice speaking about: "${session.prompt.topic}" and the prompt is "${session.prompt.prompt}" with difficulty at ${session.prompt.difficulty}. You are continuing the conversation by replying to ${data.studentMessage}. Your text should be enough to cover 20s of real conversation time. Respond in Spanish.`,
          },
          { role: "user", content: data.studentMessage },
        ],
      });

    
      session.messages.push({
        speaker: "ai",
        content: aiResponse.choices[0].message.content,
        timestamp: Date.now(),
      });

      
      await session.save();

    
      socket.emit("ai-response", {
        sessionId: session.sessionId,
        timeStamp: session.timeStamp,
        aiMessage: aiResponse.choices[0].message.content,
      });
    });
    
  });


// log every request to the console
app.use((req, res, next) => {
    console.log('>', req.method, req.path);
    next();
});

// --- Change nothing above this line ---


// Connect to MongoDB

/*
Endpoint queries conjugations collection filters by user difficulty and tense
*/
app.get('/conjugations', async (req, res) => {
    const difficulty = req.query.difficulty;
    const numberQuestions = parseInt(req.query.numberQuestions);
    const tense = req.query.tense;

    let filter = {};
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (tense) {
      filter.tense = tense;
    }

    const filters =[
        {$match: filter}, {$sample: {size: numberQuestions}}
    ]


    const conjugations = await db
      .collection("conjugations")
      .aggregate(filters)
      .toArray();

    res.status(200).json(conjugations);
});

app.get('/reading', async (req, res) => {

    const difficulty = req.query.difficulty;
    const liveText = req.query.q
    const numberQuestions = parseInt(req.query.numberQuestions)
    const topic = req.query.topic



    let filter = {}
    if (difficulty) {
        filter.difficulty = difficulty;
    }
    if(topic){
        filter.topic = topic
    }
    if(liveText){
        filter.$text = {$search: liveText}
    }
    

    const readings = await db
      .collection("passages")
      .aggregate([
        { $match: filter }, 
        { $sample: { size: 1 } }, 
      ])
      .toArray();



    if(readings){
      const passage = readings[0]
      passage.questions = pickRandom(passage.questions, numberQuestions);
      res.status(200).json(passage);
    } else {
      res.status(404).send()
    }
  
  
    
});



app.get("/speech-prompt",  async (req, res) => {


    const difficulty = req.query.difficulty;
    

    const topic = req.query.topic;

    let filter = {};
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (topic) {
      filter.topic = topic;
    }
    const prompt = await db.collection("prompts").findOne(filter)
    res.status(200).json(prompt)

});



// --- Change nothing below this line ---

// 404 - not found
app.use((req, res, next) => {
    res.status(404).json({message: 'resource ' + req.url + ' not found'});
});

// 500 - Any server error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send()
});

// start server on port
server.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `error: port ${port} is already in use!`,
      "kill this server! (control + c)"
    );
    process.exit(1);
  } else {
    console.error("Server error:", error);
  }
});