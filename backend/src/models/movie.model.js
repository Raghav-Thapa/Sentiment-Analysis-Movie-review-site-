const mongoose = require('mongoose')
const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug:{
        type: String,
        require: true,
        unique: true
    },
    categories:[{
        type: mongoose.Types.ObjectId,
        ref:"Category"
    }],
    detail:{
        type: String
    },
    duration:{
        type: String
    },
    releaseYear:{
        type: String
    },
    isfeatured:{
        type: Boolean,
        default: false
    },
        status:{
            type: String,
            ennum:['active','inactive'],
            default: 'inactive'
        },
        images: {
            type: Array,
          },
        // sentimnet:{
        //     type: mongoose.Types.ObjectId,
        //     default: null,
        //     ref: "SentimentResult"
        // }
},{
    timestamps:true,
    autoInced:true
})

const MovieModel = mongoose.model("Movie", MovieSchema)
module.exports = MovieModel