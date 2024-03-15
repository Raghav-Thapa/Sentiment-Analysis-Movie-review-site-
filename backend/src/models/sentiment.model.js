const mongoose = require('mongoose');

const sentimentResultSchema = new mongoose.Schema({
  username: String,
  moviename: String,
  text: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now },
  movie: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "Movie",
  },
  expansion: String,
  charactersRemoval: String,
  stopwordsRemoval: String,
  stemming: String,
  vectorizedText: [{ index: Number, score: Number }],
  cleanedText: String,
});

module.exports = mongoose.model('SentimentResult', sentimentResultSchema);
