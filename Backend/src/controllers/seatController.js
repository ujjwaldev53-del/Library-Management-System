const Seat = require("../models/Seat")


exports.getAllSeats = async (req, res) => {
    try {

        const allSeats = await Seat.find()
        res.status(200).json({ success: true, seats: allSeats, message: "Here are all Seats" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

exports.bookSeat = async (req, res) => {
    try {
        const userID = req.user.userID
        const { seatId, slot } = req.body
        const seat = await Seat.findById(seatId)
        if (!seat) {
            return res.status(404).json({ success: false, message: "Resource Not Found" })
        }
        else {
            if (seat.status !== "available") {
                return res.status(400).json({ success: false, message: "Seat not available" })
            }
            else {
                if (seat.bookedBy && seat.bookedBy.toString() === userID) {
                    return res.status(404).json({ success: false, message: "You already booked this seat" })
                }
                else {
                    seat.status = "booked";
                    seat.bookedBy = userID;
                    seat.bookedAt = Date.now();
                    if (slot) {
                        seat.slot = slot
                    }
                    await seat.save()
                    return res.status(200).json({ success: true, message: "You Booked Seat Successfully" })
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.cancelBooking = async (req,res) => {
   try{
    const seatId = req.params.seatId
    const userID = req.user.userID
    const seatToBeCancelled = await Seat.findById(seatId)
    if(!seatToBeCancelled){
        return  res.status(404).json({success : false , message : "Seat not found"})
    }
    else{
        if(seatToBeCancelled.bookedBy.toString() !== userID){
            return res.status(403).json({success : false , message : "Seat is not booked by you"})
        }
        else{
            if(seatToBeCancelled.status !== 'booked'){
                return res.status(400).json({success : false , message : "Seat is not booked"})
            }
            else{
                seatToBeCancelled.status = 'available' ;
                seatToBeCancelled.bookedBy = null ;
                seatToBeCancelled.bookedAt  = null ;
                await seatToBeCancelled.save()
                return res.status(200).json({success : true , message  : "You Cancelled Your Seat booking"})
            }
        }
    }
   }
   catch (error) {
    res.status(500).json({ success: false, message: error.message })
}
}

exports.myBookings = async (req,res) => {
    try{
        const userID = req.user.userID
        const mySeat = await Seat.find({
            bookedBy : userID,
            status :"booked"
        })
        return res.status(200).json({success : true , bookings : mySeat })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.addSeat = async (req,res) => {
    try{
const {seatNumber , slot } = req.body
const existingSeat = await Seat.findOne({seatNumber})
if(existingSeat){
    return res.status(400).json({success : false , message : "Seat Number Already booked"})
}
else{
    const newSeat = await Seat.create({
        seatNumber , slot
    })
    return res.status(201).json({success : true , seat : newSeat })
}
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.removeSeat = async (req,res) => {
    try{
        const seatId = req.params.seatId
        const seat = await Seat.findById(seatId)
        if(!seat){
            return res.status(404).json({success : false , message : " the Seat not found "})
        }
        else{
            if(seat.status == 'booked'){
                return res.status(400).json({success : false , message :  "cannot  delete a booked seat"})
            }
            else{
                await Seat.findByIdAndDelete(seatId)
                return res.status(200).json({success : true , message : "Seat Deleted Sucessfully"})
            }
        }
    }
    catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}