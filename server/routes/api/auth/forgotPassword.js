const { sendEmail } = require("../../../utils/sendEmail");
const User = require("../../../models/User");
const ForgotPassword = require("../../../models/ForgotPassword");
const jwt = require("jsonwebtoken");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_OR_KEY, {
      expiresIn: "1h",
    });
    const forgotPassword = new ForgotPassword({ email, token });
    await forgotPassword.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const options = {
      to: email,
      subject: "Reset Password",
      html: resetUrl,
    };
    const response = await sendEmail(options);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error during forgot password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPassword = forgotPassword;
