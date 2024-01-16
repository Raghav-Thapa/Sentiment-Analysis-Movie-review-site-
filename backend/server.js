const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const SentimentResult = require('./src/models/sentiment.model');
const routes = require('./src/routes');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use("/assets/", express.static(process.cwd()+"/public/"));

app.use("/api", routes)

// mongodb://127.0.0.1:27017/SentimentAnalysis
// mongodb+srv://raghavmern:xEFnruxlnhmgx0HT@Cluster0.aguznsx.mongodb.net/SentimentAnalysis

mongoose.connect(process.env.MONGODB_URL, {
  autoCreate: true,
  autoIndex: true,
}).then((conn) => {
  console.log("DB server connected")
})
.catch((except) => {
  console.log("Error establishing db connection...")
});

// app.post('/predict', (req, res) => {
//   const text = req.body.text;

//   // Run a Python script as a subprocess to make predictions
//   const pythonProcess = spawn('python', [
//     path.join(__dirname, 'predict.py'), // Path to Python script
//     JSON.stringify(text), // Pass inputData as a JSON string
//   ]);

//   // Collect predictions from the Python script
//   let predictions = '';
//   pythonProcess.stdout.on('data', (data) => {
//     predictions += data.toString();
//   });

//   pythonProcess.on('close', async (code) => {
//     if (code === 0) {
//       try {
//         const result = JSON.parse(predictions);

//         // Save the sentiment analysis result to the database
//         const sentimentResult = new SentimentResult({
//           text,
//           sentiment: result,
//         });
//         console.log(sentimentResult)
//         try {
//           await sentimentResult.save();
//           const responseObj = {
//             text: sentimentResult.text,
//             sentiment: sentimentResult.sentiment,
//             timestamp: sentimentResult.timestamp,
//           };
//           res.json(responseObj);
//         } catch (error) {
//           res.status(500).json({ error: 'Error saving sentiment result' });
//         }

//       } catch (error) {
//         res.status(500).json({ error: 'Prediction failed' });
//       }
//     } else {
//       res.status(500).json({ error: 'Prediction process exited with an error' });
//     }
//   });
// });

// app.get('/sentiments', async (req, res) => {
//   try {
//     const positiveSentiments = await SentimentResult.find({ sentiment: 'pos' });
//     const negativeSentiments = await SentimentResult.find({ sentiment: 'neg' });

//     res.json({ positiveSentiments, negativeSentiments });
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving sentiments' });
//   }
// });

app.use((error, req, res, next) => {
  let status = error && error.status ? error.status : 500;
  let msg = error && error.msg ? error.msg : "internal server error"
  console.log(error)

  res.status(status).json({
      result: null,
      status: false,
      msg: msg,
      meta: null

  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
