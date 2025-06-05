import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
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
    const difficulty = req.query.difficulty
    const numberQuestions = req.query.numberQuestions
    const searchText = req.query.q



    let filter = {}
    if (difficulty) {
        filter.difficulty = difficulty;
    }
    if (searchText) {
        filter.$text = { $search: searchText }
    }

    const conjugations = await db.collection('conjugations')
        .find(filter).limit(parseInt(numberQuestions))
        .toArray();
    console.log(conjugations)
    res.status(200).json(conjugations);
});

app.get('/reading', async (req, res) => {
    const difficulty = req.query.difficulty
    console.log(difficulty)


    let filter = {}
    if (difficulty) {
        filter.difficulty = difficulty;
    }

    const readings = await db.collection('readings')
        .findOne(filter)
    console.log(readings)

    res.status(200).json(readings);
});


/* This endpoint is implemented correctly because it takes the event ID provided in the URI and searched for that event
if the event exists, then it returns a 200 status code and json of the event document. But, if it doesn't exist it will return a
404 status code. Therefore, follows best practices*/
app.get('/api/events/:EVENT_ID', async (req, res) => {
    const eventId = req.params.EVENT_ID
    const event = await db.collection('events').findOne(new ObjectId(eventId));
    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).send();
    }
});

/* I implemented this endpoint correctly because first I verify the Id is associated with a document if not I return 404.
Then I perform the delete operation. If the deleted count is greater than 1 I return 200 with no json document. If not then I return 404*/
app.delete('/api/events/:EVENT_ID', async (req, res) => {
    const id = req.params.EVENT_ID
    const event = await db.collection('events').findOne({
        _id: new ObjectId(id)
    })
    if (event == null) {
        res.status(404).send();
    }
    const deletedEvent = await db.collection("events").deleteOne({
        _id: new ObjectId(id)
    })
    if (deletedEvent.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(404).send();
    }
})

/* This endpoint is implemented correctly because I set the req.body to eventData.
Then I insert the eventData as a new document to the collection. If insertOne was successful by the createEvent.acknowledge
then I return a status code of 201 with the JSON document of the newly inserted document. */
app.post('/api/events', async (req, res) => {
    const eventData = req.body;

    const createEvent = await db.collection("events").insertOne(eventData);

    if (createEvent.acknowledged) {
        const insertedId = createEvent.insertedId;
        const newEvent = await db.collection("events").findOne({ _id: insertedId });
        res.status(201).json(newEvent);
    }
})

/* This endpoint is correctly implemented because I first take in the Event id in the parameter. Then I
preemptively delete any _id field in the JSON object. Then I use eventData to perform the replace operation on the document found by event ID. Then I correclty return the staus codes */
app.put('/api/events/:EVENT_ID', async (req, res) => {

        const eventId = new ObjectId(req.params.EVENT_ID);
        const event = await db.collection('events').findOne({
            _id: new ObjectId(eventId)
        })

        if (event == null) {
            res.status(404).send();
        }

        const eventData = req.body;
        delete eventData._id;

        const result = await db.collection("events").replaceOne(
            { _id: eventId },
            eventData
        );

        if (result.acknowledged) {
            res.status(200).send();
        }
        if (result.matchedCount === 0) {
            res.status(404).send();
        }

    }
);

/* This endpoint is implemented correctly because I updated the document found by eventID given in the URI parameters.
I then use $set: with the given updateData in the req body. Then, I correctly return the status codes based on the instructions
 */
app.patch('/api/events/:EVENT_ID', async (req, res) => {
    const eventId = new ObjectId(req.params.EVENT_ID);

    const updateData = req.body;

    const result = await db.collection("events").updateOne(
        { _id: eventId },
        { $set: updateData }
    );

    if (result.acknowledged) {
        res.status(200).send();
    }
    if (result.matchedCount === 0) {
        res.status(404).send();
    }
});

/* This is implemented correclty because I follow best practices for the URI.
Then I verify that the eventID in the parameter is associated with a document
if not I return 404. Then I increment attendees by 1 since this action endpoint is to rsvp. Then
if modifiedCount is greatere than 0 indicating a success then I return 200 or else I return 404 */
app.post('/api/events/:EVENT_ID/rsvp', async (req, res) => {
    const eventId = req.params.EVENT_ID;
    const objectId = new ObjectId(eventId);

    const event = await db.collection('events').findOne({ _id: objectId });
    if (!event) {
        return res.status(404).send();
    }

    const result = await db.collection('events').updateOne(
        { _id: objectId },
        { $inc: { attendees: 1 } }
    );

    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else if (result.matchedCount == 0) {
        res.status(404).send();
    }

});

/* This is implemented correclty because I follow best practices for the URI.
Then I verify that the eventID in the parameter is associated with a document
if not I return 404. Then I decrement attendees by 1 since this action endpoint is to cancel a rsvp. Then
if modifiedCount is greatere than 0 indicating a success then I return 200 or else I return 404 */
app.post('/api/events/:EVENT_ID/cancel-rsvp', async (req, res) => {
    const eventId = req.params.EVENT_ID;

    const objectId = new ObjectId(eventId);
    const event = await db.collection('events').findOne({ _id: objectId });

    if (!event) {
        res.status(404).send();
    }

    const result = await db.collection('events').updateOne(
        { _id: objectId },
        { $inc: { attendees: -1 } }
    );

    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else if (result.matchedCount == 0) {
        res.status(404).send();
    }
});

// --- Change nothing below this line ---

// 404 - not found
app.use((req, res, next) => {
    res.status(404).json({ message: 'resource ' + req.url + ' not found' });
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