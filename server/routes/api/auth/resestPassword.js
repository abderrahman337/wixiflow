const bcryptjs = require("bcryptjs");
const User = require("../../../models/User");

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.updateOne({ email: email }, { password: hashedPassword });
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = resetPassword;
