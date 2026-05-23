const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const borrowController = require ("../controllers/borrowController")

const Router = express.Router()

Router.post("/", authMiddleware , borrowController.borrowBook)
Router.put("/return" , authMiddleware , borrowController.returnBook)
Router.get("/my-borrows" , authMiddleware , borrowController.borrowDetails)

module.exports = Router ;