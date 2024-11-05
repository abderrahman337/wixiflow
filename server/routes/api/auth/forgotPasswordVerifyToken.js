const ForgotPassword = require("../../../models/ForgotPassword");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const forgotPasswordVerifyToken = async (req, res) => {
  const { token } = req.body;
  // console.log("process.env.JWT_SECRET", process.env.JWT_SECRET_OR_KEY);
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_OR_KEY);

    // console.log("decoded", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // console.log("forgotPassword", decoded);
    const forgotPassword = await ForgotPassword.findOne({ token });
    // console.log("forgotPassword", forgotPassword);

    if (!forgotPassword) {
      return res.status(404).json({ message: "Invalid token" });
    }
    return res
      .status(200)
      .json({ message: "Token verified", email: forgotPassword.email });
  } catch (error) {
    console.error("JWT verification error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPasswordVerifyToken = forgotPasswordVerifyToken;
