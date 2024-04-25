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

const uri = "mongodb+srv://muhammadmanekia0:LVPOpVTUoEL33nX8@cluster0.gpujgbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.post('/saveFood', async (req, res) => {
    try {
      const newFood = new Food({
        ...req.body,
        user: req.body.userId  // Expecting a userId field in the request
      });
      await newFood.save();
      res.status(201).send({ message: 'Food data saved successfully' });
    } catch (error) {
      res.status(500).send(error);
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


app.listen(80, () => {
  console.log('Server running on http://localhost:80');
});
