const express = require("express")
const authController = require ("../controllers/authController")

const Router = express.Router()

Router.post("/register" , authController.register)

module.exports = Router;