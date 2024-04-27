const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use environment variable for MongoDB URI for security and flexibility
const uri = "mongodb+srv://alaansharif6:uJOkOTSICVEBvTgm@cluster0.tp7ykbg.mongodb.net/"

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Mongoose schemas
const StatsSchema = new mongoose.Schema({
    userId: String,
    startWeight: Number,
    goalWeight: Number,
    currentWeight: Number,
    weightLost: Number,
}, { collection: 'Stats' }); // Make sure this matches the collection name in your database

const ActivitySchema = new mongoose.Schema({
    userId: String,
    day: String,
    minutes: Number,
}, { collection: 'Activity' });

const ProgressSchema = new mongoose.Schema({
    userId: String,
    week: Number,
    weight: Number,
}, { collection: 'Progress' });

// Mongoose models
const Stats = mongoose.model('Stats', StatsSchema);
const Activity = mongoose.model('Activity', ActivitySchema);
const Progress = mongoose.model('Progress', ProgressSchema);

// API endpoints
app.get('/api/Stats/:userId', async (req, res) => {
    try {
        const Stats = await Stats.findOne({ userId: req.params.userId });
        if (!Stats) return res.status(404).send('User progress not found.');
        res.send(Stats);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/activity/:userId', async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.params.userId });
        res.send(activities);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/progress/:userId', async (req, res) => {
    try {
        const progressData = await Progress.find({ userId: req.params.userId });
        res.send(progressData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Home route for server test
app.get('/', (req, res) => {
    res.send('API is running.');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});