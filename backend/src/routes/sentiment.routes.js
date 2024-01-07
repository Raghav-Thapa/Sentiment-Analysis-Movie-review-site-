const express = require ('express')
const app = express.Router()
const sentimentCtrl = require('../controller/sentiment.controller')
const authCheck = require('../middleware/auth.middleware')

// const uploadPath =(req,res,next) => {
//     req.uploadPath ="./public/user"
//     next()

// }

app.post('/predict',authCheck, sentimentCtrl.addSentiments)
app.get('/sentiments',sentimentCtrl.listSentiments)
app.get('/sentiments/movie/:movieId',sentimentCtrl.getSentimentsByMovie);
app.put('/sentiments/:id',authCheck, sentimentCtrl.updateSentiment);

app.post('/analyze', authCheck, sentimentCtrl.analyzeMovieReviews);



module.exports = app;