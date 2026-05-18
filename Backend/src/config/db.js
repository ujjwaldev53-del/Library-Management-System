const mongoose = require("mongoose")


    const connectDB =  async () =>{
        try{
        await  mongoose.connect(process.env.MONGO_URI)
     
     console.log("database connected sucessfully")
        }
        catch(e){
            console.log("connection failed")
        }
} 
module.exports= connectDB