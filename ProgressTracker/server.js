
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Mongoose schema for User Progress
const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startWeight: Number,
    goalWeight: Number,
    currentWeight: Number,
    weightLost: Number,
    weightRemaining: Number,
    // Additional fields as necessary
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

// API Routes

// Fetch user progress data
app.get('/api/progress/:userId', async (req, res) => {
    try {
        const progress = await UserProgress.findOne({ userId: req.params.userId });
        if (!progress) return res.status(404).send('Progress not found.');
        res.send(progress);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update current weight
app.patch('/api/progress/:userId', async (req, res) => {
    try {
        const progress = await UserProgress.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
        if (!progress) return res.status(404).send('Progress not found.');
        res.send(progress);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add new progress entry
app.post('/api/progress', async (req, res) => {
    try {
        const newProgress = new UserProgress(req.body);
        await newProgress.save();
        res.status(201).send(newProgress);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Simple route for testing if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

module.exports = app;
