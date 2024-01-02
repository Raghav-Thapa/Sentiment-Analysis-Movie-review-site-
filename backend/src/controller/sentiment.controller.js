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

            // const movie = await Movie.findById(movieId);

            // if (!movie) {
            //   return res.status(404).json({ error: 'Movie not found' });
            // }
      
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
                      // movie: movie._id,
                    });
                    console.log(sentimentResult)
                    try {
                      await sentimentResult.save();
                      const responseObj = {
                        text: sentimentResult.text,
                        // movie: movie.name,
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


}

const sentimentCtrl = new SentimentController();
module.exports = sentimentCtrl