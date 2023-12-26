const express = require('express')
const app = express.Router()

const sentimentRoutes = require("./sentiment.routes")


app.use("/sentiment",sentimentRoutes);



module.exports = app;