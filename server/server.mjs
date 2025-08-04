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
          userId: data.userId || "temp_user_" + Math.random().toString(36),
          prompt: data.selectedPrompt,
          currentTurn: 1,
          maxTurns: 5,
          messages: [],
          status: "active",
          createdAt: new Date(),
        });

        // 2. Save to database
        await session.save();
      // Generate AI opening message
      // Send back to client
    });
    
    // Handle student responses
    socket.on('student-response', async (data) => {
      // Process student input
      // Generate AI reply
      // Update conversation in DB
      // Send AI response back
    });
    
    // End conversation
    socket.on('end-conversation', async (data) => {
      // Mark conversation as complete
      // Send summary/feedback
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