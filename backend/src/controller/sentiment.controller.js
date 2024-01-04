// const userServ = require('../services/user.service')
const dotenv = require("dotenv");
dotenv.config();
const SentimentResult = require('../models/sentiment.model');
const { spawn } = require('child_process');
const path = require('path');
const Movie = require('../models/movie.model');



class SentimentController {

    addSentiments = async (req, res, next) => {
        try{
            
            // const text = req.body.text;
            const { text, movieId } = req.body;

            const movie = await Movie.findById(movieId);

            if (!movie) {
              return res.status(404).json({ error: 'Movie not found' });
            }
      
            // Run a Python script as a subprocess to make predictions
            const pythonProcess = spawn('python', [
              path.join(__dirname, '../../predict.py'), // Path to Python script
              JSON.stringify(text), // Pass inputData as a JSON string
            ]);
          
            // Collect predictions from the Python script
            let predictions = '';
            pythonProcess.stdout.on('data', (data) => {
              predictions += data.toString();
            });

            pythonProcess.on('close', async (code) => {
                if (code === 0) {
                  try {
                    const result = JSON.parse(predictions);
            
                    // Save the sentiment analysis result to the database
                    const sentimentResult = new SentimentResult({
                      text,
                      sentiment: result,
                      moviename: movie.name,
                      movie: movie._id,
                    });
                    console.log(sentimentResult)
                    try {
                      await sentimentResult.save();
                      const responseObj = {
                        text: sentimentResult.text,
                        moviename: movie.name,
                        sentiment: sentimentResult.sentiment,
                        timestamp: sentimentResult.timestamp,
                      };
                      res.json(responseObj);
                    } catch (error) {
                      res.status(500).json({ error: 'Error saving sentiment result' });
                    }
            
                  } catch (error) {
                    res.status(500).json({ error: 'Prediction failed' });
                  }
                } else {
                  res.status(500).json({ error: 'Prediction process exited with an error' });
                }
              });


        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
  
      getSentimentsByMovie = async (req, res, next) => {
          try {
              const { movieId } = req.params;
  
              const sentiments = await SentimentResult.find({ movie: movieId });
  
              if (!sentiments) {
                  return res.status(404).json({ error: 'No sentiments found for this movie' });
              }
  
              return res.json(sentiments);
          } catch (error) {
              // Handle error
          }
      }
  

    listSentiments = async (req, res, next) => {
        try{
            try {
                const positiveSentiments = await SentimentResult.find({ sentiment: 'pos' });
                const negativeSentiments = await SentimentResult.find({ sentiment: 'neg' });
            
                res.json({ positiveSentiments, negativeSentiments });
              } catch (error) {
                res.status(500).json({ error: 'Error retrieving sentiments' });
              }
        } catch(exception){
            next(exception)
        }

    }

    updateSentiment = async (req, res, next) => {
      try {
          const { id } = req.params;
          const { sentiment } = req.body;

          const sentimentResult = await SentimentResult.findByIdAndUpdate(id, { sentiment }, { new: true });

          if (!sentimentResult) {
              return res.status(404).json({ error: 'Sentiment result not found' });
          }

          return res.json(sentimentResult);
      } catch (error) {
          next(error);
      }
  }


}

const sentimentCtrl = new SentimentController();
module.exports = sentimentCtrl