const User = require("../../../models/User");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { deleted: true }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteUser = deleteUser;
