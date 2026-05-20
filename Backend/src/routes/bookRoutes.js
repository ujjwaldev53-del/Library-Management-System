const express = require ("express")
const isAdmin = require ("../middleware/isAdmin")
const authMiddleware = require("../middleware/authMiddleware")
const bookController = require("../controllers/bookController")
console.log(bookController)
console.log("authMiddleware:", authMiddleware);
console.log("isAdmin:", isAdmin);
const Router = express.Router()

Router.post("/" , authMiddleware , isAdmin , bookController.createBook)
Router.get("/" , authMiddleware , bookController.getAllBooks)

module.exports = Router;