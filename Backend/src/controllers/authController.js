const User = require("../models/User.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body

    let existingUser = await User.findOne({ email })
    if (existingUser != null) {
      return res.status(400).json({ success: false, message: "user Already exists" })
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    await User.create({ name, email, password: hashedPassword, role: role || "user" })
    return res.status(201).json({ success: true, message: "User created sucessfully" })
  }
  catch (error) {
    console.log("failed because", error)
    res.status(500).json({ success: false, message: error.message })
  }
}


exports.login = async (req, res) => {

  try {
    const { email, password } = req.body
    let newUser = await User.findOne({ email })
    if (newUser === null) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' })
    }
    const comparePassword = await bcryptjs.compare(password, newUser.password)
    if (comparePassword == false) {
      return res.status(400).json({ success: false, message: "Inavlid cridential" })

    }
    else {
      const token = jwt.sign({ userID: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" })
      return res.status(200).json({
        success: true, token: token
        , user: {
          id: newUser._id,
          name : newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        message: "token generated sucessfully"
      })
    }

  }
  catch (error) {
    console.log("failed because", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getme = async (req,res) =>{
 const userId = req.user.userID



 try{
  const foundUser =  await User.findById(userId).select('-password')
  if(foundUser == null){
    return res.status(404).json({success: false ,message :'User not found'})
   }
   else{
  
  
   
  return res.status(200).json({success:true , message :" user found",
user : {
  id: foundUser._id,
  email: foundUser.email,
  role: foundUser.role
}})


   }
}
catch(error){
  return res.status(500).json({success : false , message: error.message })
}

}