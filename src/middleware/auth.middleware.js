import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded ID:", decoded.id);

    // Find user by id (or email if you included it in token)
    const user = await User.findById(decoded.id).select("username email");

    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    // Attach user to request
    req.user = { id: user._id, email: user.email, username: user.username };

    next();
  } catch (error) {
    console.log("Protect Error:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default protect;
