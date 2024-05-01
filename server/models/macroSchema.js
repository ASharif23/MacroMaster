const mongoose = require('mongoose');

const macroSchema = new mongoose.Schema({
  date: Date,
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Macro = mongoose.model('Macro', macroSchema);

module.exports = Macro;