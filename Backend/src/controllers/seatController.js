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