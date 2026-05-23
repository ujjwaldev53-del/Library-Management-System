const mongoose = require ("mongoose")
const Seat = new mongoose.Schema({
    seatNumber : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
       enum : [ 'available', 'booked', 'maintenance'],
       default : 'available'

    },
    bookedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },
    bookedAt : {
        type : Date,
        default : null
    },
    slot : {
        required : true,
        type : String,
        enum : ['morning','afternoon','full-day']
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("Seat",Seat)
