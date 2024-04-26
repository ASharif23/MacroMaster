const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
