const express = require ('express')
const app = express.Router()
const authCtrl = require('../controller/auth.controller')
const authCheck = require("../middleware/auth.middleware")
const uploader = require('../middleware/uploader.middleware')

const uploadPath =(req,res,next) => {
    req.uploadPath ="./public/user"
    next()

}

app.post('/login', authCtrl.login)
app.post('/register',uploadPath,uploader.single('image'),authCtrl.register)
app.post('/activate/:token', authCtrl.activateUser)
app.post('/forget-password',authCtrl.forgetPassword)
app.post('/reset-password', authCtrl.resetPassword)
app.get('/me',authCheck,authCtrl.getLoggedInUser)

// app.get("/refresh-token", authCheck, authCtrl.refreshToken)

module.exports = app;