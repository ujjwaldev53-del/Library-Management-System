const express = require("express")
const authController = require ("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

const Router = express.Router()

Router.post("/register" , authController.register)
Router.post("/login" , authController.login)
Router.get("/me" , authMiddleware , authController.getme )

module.exports = Router;