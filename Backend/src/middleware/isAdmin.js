const isAdmin = (req, res, next) => {
    console.log("isAdmin - req.user:", req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: "Admin access Required" });
    }
};

module.exports = isAdmin;