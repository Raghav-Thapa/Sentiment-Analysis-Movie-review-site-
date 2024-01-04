const express = require ('express')
const app = express.Router()
const sentimentCtrl = require('../controller/sentiment.controller')

// const uploadPath =(req,res,next) => {
//     req.uploadPath ="./public/user"
//     next()

// }

app.post('/predict', sentimentCtrl.addSentiments)
app.get('/sentiments', sentimentCtrl.listSentiments)
app.get('/sentiments/movie/:movieId', sentimentCtrl.getSentimentsByMovie);
app.put('/sentiments/:id', sentimentCtrl.updateSentiment);



module.exports = app;