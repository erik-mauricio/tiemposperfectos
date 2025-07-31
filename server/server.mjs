import express from 'express';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());



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


app.post('/generate-prompt', async (req, res) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "user",
                content: "Write a Spanish conversation topic for learners." }
        ]
    });
    console.log(response.choices[0].message.content);
    res.status(200).json({prompt: response.choices[0].message.content});
});


app.post('/AI-speak', async (req, res) => {
    const text = req.body.text;
    const topic = req.body.topic;

    let isFirst = false;
    if(text === undefined){
        isFirst = true;
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "user",
                content: "Write a Spanish conversation topic for learners." }
        ]
    });
    console.log(response.choices[0].message.content);
    res.status(200).json({prompt: response.choices[0].message.content});
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
const server = app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}/`);
});
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`error: port ${port} is already in use!`, 'kill this server! (control + c)');
        process.exit(1);
    } else {
        console.error('Server error:', error);
    }
});
// Add these endpoints to your server.mjs file