const mongoose = require('mongoose');

const sentimentResultSchema = new mongoose.Schema({
  text: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SentimentResult', sentimentResultSchema);
