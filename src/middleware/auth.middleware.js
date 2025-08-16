import jwt from 'jsonwebtoken';
import User from "../user/user.model.js"


const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    //  console.log('Token:', token)
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }


  console.log("Decoded ID:", decoded.id);
const user = await User.findById(decoded.id) || await User.findOne({ email: decoded.email });

// console.log("Found user:", user);


    if (!user) {
      return res.status(401).json({ message: 'No user' });
    }

    req.user = { id: user._id, email: user.email, username: user.username };
    next();
  } catch (error) {
    console.log('Protect Error:', error.message)
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default protect;
