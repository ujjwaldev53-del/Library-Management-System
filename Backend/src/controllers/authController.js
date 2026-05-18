const User = require("../models/User.js")
const  bcryptjs = require("bcryptjs")

exports.register = async (req, res) => {
    try{
 
    const {name, email, password , role} = req.body

    let existingUser = await User.findOne ({email})
      if(existingUser != null){
    return res.status(400).json({success: false , message:"user Already exists"})
    }
    const hashedPassword =  await bcryptjs.hash(password, 10)
    await User.create( {name , email , password : hashedPassword , role : role || "user"}) 
    return res.status(201).json({success: true , message:"User created sucessfully"})
    }
    catch(error){
        console.log("failed because" , error)
        res.status(500).json({success: false , message: error.message})
    }
}