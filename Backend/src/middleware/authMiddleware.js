const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("1. authMiddleware called");
    const authHeader = req.headers.authorization;
    console.log("2. authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("3. No token or wrong format");
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Use space, not "Bearer " exactly
    console.log("4. Extracted token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("5. Decoded token:", decoded);
        req.user = { userID: decoded.userID, role: decoded.role };
        console.log("6. req.user set:", req.user);
        next();
    } catch (error) {
        console.log("7. JWT error:", error.message);
        return res.status(401).json({ success: false, message: error.message });
    }
};

module.exports = authMiddleware;