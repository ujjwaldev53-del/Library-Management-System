const mongoose = require("mongoose")
const Book = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required : true
    },
    isbn: {
        type : String,
        unique: true
    },
    totalCopies: {
        type: Number,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true,
        default : function (){
           return this.totalCopies
        }
    },
    genre: {
        type: String
    },
    publishedYear: {
        type: Number
    }
},
    {
        timestamps: true
    })
    
    module.exports = mongoose.model("Book" , Book  )