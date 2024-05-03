const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require( './models/userSchema.js' );
const Food = require( './models/foodSchema.js' );
const axios = require( "axios" );


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors())

// const uri = "mongodb+srv://muhammadmanekia0:LVPOpVTUoEL33nX8@cluster0.gpujgbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://alaansharif6:uJOkOTSICVEBvTgm@cluster0.tp7ykbg.mongodb.net/"

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

app.post('/burnedCalories', async (req, res) => {
  console.log("Burned Calories Endpoint Hit")
  const { activity, time } = req.body;
  try {
    const result = await burnedCalories(activity, time); // Your existing function
    console.log("RES", result)
    res.json(result);
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function burnedCalories(activity, time) {
  return new Promise((resolve, reject) => {
      const API_KEY = "RfVcGq/F7fViDDBT/OXRig==xTJ3yL273L4Xa9l6";
      axios.get(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`, {
          headers: { 'X-Api-Key': API_KEY }
      }).then(response => {
          const bestResponse = response.data[0];
          const caloriesBurned = time ? (bestResponse.total_calories * time / 60) : bestResponse.total_calories;
          resolve({"name": bestResponse.name, "calories_burned": caloriesBurned});
      }).catch(error => {
          reject(error);
      });
  });
}


app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
