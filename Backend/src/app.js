const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const bookRoutes = require("./routes/bookRoutes")
const borrowRoutes = require("./routes/borrowRoutes")
const seatRoutes = require("./routes/seatRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test' , (req,res)=>{
   res.json({message : "api is working"} )
})

app.use("/api/auth", authRoutes )
app.use("/api/books" , bookRoutes)
app.use("/api/borrow" , borrowRoutes)
app.use("/api/seats" , seatRoutes)




module.exports=app