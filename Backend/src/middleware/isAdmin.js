const isAdmin = (req,res,next) =>{
    if( req.user != undefined && req.user.role === 'admin' ){
                next()
            }
    else{
        return res.status(403).json({success : false , message : "Admin access Required"})
    }
}
module.exports = isAdmin;