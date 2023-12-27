const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        min: 3,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    image:{
        type: String
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["admin","seller","customer"],
        default: "customer"
    },
    status:{
        type: String,
        enum: ["active","inactive"],
        default: "inactive"
    },
    activationToken: {
        type: String,
        default: null
    },
    resetToken:{
        type:String,
        default: null
    }
},{
    timestamps: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel