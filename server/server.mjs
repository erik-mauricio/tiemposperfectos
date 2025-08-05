import express from 'express';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import { createServer } from "http"; 
import { Server } from "socket.io";
import OpenAI from "openai";

dotenv.config();


const port = process.env.PORT || 8080;
const app = express();
const apiKey = process.env.OPEN_AI_KEY;
app.use(cors());
app.use(express.json());
const server = createServer(app);
const openAi = new OpenAI(apiKey);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('start-conversation', async (data) => {
        const session = new Conversation({
          sessionId: generateUniqueId(),
          userId: "temp_user_" + Math.random().toString(36),
          prompt: data.selectedPrompt,
          currentTurn: 1,
          maxTurns: 5,
          messages: [],
          status: "active",
          createdAt: new Date(),
        });

        socket.sessionId = session.sessionId;
      
        await session.save();

        const aiOpening = await openAi.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are helping a student practice speaking about: "${data.selectedPrompt.text}". Start the conversation by introducing the topic and asking an engaging question. Your text should be enough to cover 20s of real conversation time. Respond in Spanish.`,
            },
            {
              role: "user",
              content: "Begin",
            },
          ],
        });

        session.messages.push({
          speaker: "ai",
          message: aiOpening,
          turnNumber: 1,
          timestamp: new Date(),
        });
        await session.save();


        socket.emit("conversation-started", {
          sessionId: session.sessionId,
          aiMessage: aiOpening,
          turnNumber: 1,
        });
    });
    

    socket.on("student-response", async (data) => {
      const session = await Conversation.findOne({
        sessionId: socket.sessionId,
      });


      session.messages.push({
        speaker: "student",
        message: data.message,
        turnNumber: session.currentTurn,
        timestamp: new Date(),
      });


      const aiResponse = await generateAIResponse(data.message);

    
      session.messages.push({
        speaker: "ai",
        message: aiResponse,
        turnNumber: session.currentTurn,
        timestamp: new Date(),
      });


      session.currentTurn += 1;
      if (session.currentTurn > session.maxTurns) {
        session.status = "completed";
        session.completedAt = new Date();
      }

      
      await session.save();

    
      socket.emit("ai-response", {
        message: aiResponse,
        turnNumber: session.currentTurn,
        isComplete: session.status === "completed",
      });
    });
    
    socket.on("end-conversation", async (data) => {
   
      const session = await Conversation.findOne({
        sessionId: socket.sessionId,
      });

 
      session.status = "completed";
      session.completedAt = new Date();
      await session.save();



      socket.emit("conversation-ended", {
        sessionId: session.sessionId,
        summary: {
          totalTurns: session.messages.length,
          duration: session.completedAt - session.createdAt,
          feedback: "Great job practicing!",
        },
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
const client = new MongoClient('mongodb://localhost:27017');
const conn = await client.connect();
const db = conn.db('app');


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
    console.log(conjugations)
    res.status(200).json(conjugations);
});

app.get('/reading', async (req, res) => {
    console.log("hi")
    const difficulty = req.query.difficulty;
    console.log(difficulty)
    const liveText = req.query.q
    const topic = req.query.topic
    console.log(topic);


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

    const readings = await db.collection('passages')
        .findOne(filter)
    console.log(readings)
    res.status(200).json(readings);
});



app.get("/speech-prompt",  async (req, res) => {
    console.log("=== ROUTE HIT ===");
    console.log("Query params:", req.query);

    const difficulty = req.query.difficulty;
    console.log("Difficulty:", difficulty);

    const topic = req.query.topic;
    console.log("Topic:", topic);
    let filter = {};
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (topic) {
      filter.topic = topic;
    }
    const prompt = await db.collection("prompts").findOne(filter)
    console.log(prompt)
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