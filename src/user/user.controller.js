import User from "./user.model.js";


export const getProfile = async (req, res) => {
  try {
    // find the user again from DB
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
