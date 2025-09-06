import User from "./user.model.js";
import bcrypt from 'bcrypt'


export const getProfile = async (req, res) => {
  try {
  
    const user = await User.findById(req.user.id).select("username email _id createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

export  const updateProfile = async(req,res) => {
  try {

    const {id} = req.user
    const payload = req.body;

    const updatedProfile = await User.findByIdAndUpdate( id, payload,
     {  new: true }).select('-password')

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({updatedProfile, message: 'Profile updated successfully'})
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
}



export const updatePassword = async (req, res) => {
  try {
    const { newPassword, currentPassword } = req.body;
    const userId = req.user?.id; // comes from your auth middleware

    if (!newPassword || !currentPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare current password with DB hash
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // Set new password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully ✅" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
