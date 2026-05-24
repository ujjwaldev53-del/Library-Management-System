const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/isAdmin")
const seatController = require("../controllers/seatController")

const Router = express.Router()

Router.get("/test-auth", authMiddleware, (req, res) => {
    console.log("Test-auth hit");
    res.json({ message: "Auth works", user: req.user });
});

Router.get("/", authMiddleware , seatController.getAllSeats)
Router.post("/book" , authMiddleware , seatController.bookSeat)
Router.put("/cancel/:seatId" , authMiddleware , seatController.cancelBooking)
Router.get("/my-booking" , authMiddleware , seatController.myBookings)
Router.post("/admin", authMiddleware, isAdmin, seatController.addSeat);
Router.delete("/admin/:seatId"  , authMiddleware, isAdmin , seatController.removeSeat)

module.exports = Router ;







