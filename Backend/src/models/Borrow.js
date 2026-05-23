const mongoose = require("mongoose")

const Borrow = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    book: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    borrowDate: {
        type: Date
        , default: () => Date.now()
    },
    dueDate: {
        required: true,
        type: Date,
        default: function () {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }


    },
    returnDate: {
        type: Date,
        default: null

    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"

    },
    fineAmount : {
        type : Number,
        default : 0
    } ,
    finePaid : {
        type : Boolean,
        default : false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Borrow", Borrow)