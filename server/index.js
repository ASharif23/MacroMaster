const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require( './models/userSchema.js' );
const Food = require( './models/foodSchema.js' );


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors())

// const uri = "mongodb+srv://muhammadmanekia0:LVPOpVTUoEL33nX8@cluster0.gpujgbb.mongodb.net/MacroMaster?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://alaansharif6:uJOkOTSICVEBvTgm@cluster0.tp7ykbg.mongodb.net/MacroMaster"

const JWT_SECRET='f3b8fdbea8b1d3d177c1e2cbaefb97a8f31db4b5044e365bfbad744c701f8404e7739bacc011d8a8b5767ee3a5a5b0340073aa9a6b4c6b933b2feaba40903cff'


// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ userId: newUser._id, message: 'User created successfully', user: newUser, status: 201 });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/foods', async (req, res) => {
  const { userId } = req.query; // Accessing userId from query parameters

  if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
  }

  try {
      const foods = await Food.find({ user: userId }); // Query to find foods by userId
      res.status(200).json(foods);
  } catch (error) {
      console.error('Error fetching foods:', error);
      res.status(500).json({ message: 'Failed to get foods', error: error.message });
  }
});


app.post('/saveFood', async (req, res) => {
  const { userId } = req.body;

  console.log(req.body);

  try {
    const newFood = new Food({
      name: req.body.name,
      calories: req.body.calories,
      protein: req.body.protein,
      carbohydrates: req.body.carbohydrates,
      fat: req.body.fat,      
      user: userId // Directly using the userId from the body after validation
    });
    await newFood.save();
    res.status(201).send({ message: 'Food data saved successfully' });
  } catch (error) {
    console.error('Save food error:', error);
    res.status(500).send({ error: error.message, message: "Failed to save food data" });
  }
});

app.post('/saveMacros', async (req, res) => {
  const { userId } = req.body;

  console.log(req.body);

  try {
    const newFood = new Food({
      date: req.body.date,
      calories: req.body.calories,
      protein: req.body.protein,
      carbohydrates: req.body.carbohydrates,
      fat: req.body.fat,      
      user: userId // Directly using the userId from the body after validation
    });
    await newFood.save();
    res.status(201).send({ message: 'Food data saved successfully' });
  } catch (error) {
    console.error('Save food error:', error);
    res.status(500).send({ error: error.message, message: "Failed to save food data" });
  }
});

// Sign-in endpoint
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send({ message: 'Incorrect Username' });
  }

  if (user.password !== password) { // Replace with a secure password check in production
    return res.status(401).send({ message: 'Incorrect Password' });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
  res.status(200).send({ userId: user._id, message: 'User signed in successfully', token });
});

// Mongoose schemas
const StatsSchema = new mongoose.Schema({
  userId: String,
  startWeight: Number,
  goalWeight: Number,
  currentWeight: Number,
  weightLoss: Number,
}, { collection: 'Stats' });

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
app.get('/Stats/:userId', async (req, res) => {
  try {
      const stats = await Stats.findOne({ userId: req.params.userId });
      if (!stats) return res.status(404).send('User stats not found.');
      res.send(stats);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/Activity/:userId', async (req, res) => {
  try {
      const activities = await Activity.find({ userId: req.params.userId });
      res.send(activities);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/Progress/:userId', async (req, res) => {
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

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});