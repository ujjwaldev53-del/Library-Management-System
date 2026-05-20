const jwt = require("jsonwebtoken")

const authMiddleware =  (req,res,next) =>{
    const authHeader  = req.headers.authorization
    if(authHeader === undefined){
    return res.status(401).json({success: false , message : "no token provided"})
}
else{
 const token = authHeader.split("Bearer ")[1]

 try{
 const decoded = jwt.verify(token, process.env.JWT_SECRET )
 req.user = {userID : decoded.userID}
 next()
 }
catch(error){
    return res.status(401).json({success: false , message: error.message})
}
}
}
module.exports = authMiddleware ;
