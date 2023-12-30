const mongoose = require('mongoose');

const sentimentResultSchema = new mongoose.Schema({
  moviename: String,
  text: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now },
  movie:{
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "Movie"
},
});

module.exports = mongoose.model('SentimentResult', sentimentResultSchema);
