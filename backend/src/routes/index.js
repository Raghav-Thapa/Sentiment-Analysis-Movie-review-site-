const express = require('express')
const app = express.Router()

const sentimentRoutes = require("./sentiment.routes")
const authRoutes = require("./auth.routes")
const movieRoutes = require("./movie.routes")
const categoryRoutes = require("./category.routes")


app.use("/sentiment",sentimentRoutes);
app.use("/auth",authRoutes);
app.use("/movie",movieRoutes);
app.use('/category',categoryRoutes)



module.exports = app;