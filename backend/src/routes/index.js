const express = require('express')
const app = express.Router()

const sentimentRoutes = require("./sentiment.routes")
const authRoutes = require("./auth.routes")


app.use("/sentiment",sentimentRoutes);
app.use("/auth",authRoutes);



module.exports = app;