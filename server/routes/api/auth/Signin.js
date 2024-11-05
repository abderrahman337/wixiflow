const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const signinValidation = require("../../../validation/Singin");

const SignIn = async (req, res) => {
  try {
    const { isValid, errors } = signinValidation(req.body);
    console.log(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      errors.password = "Password or Email is incorrect!";
      return res.status(404).json(errors);
    }

    // Generate JWT tokens
    const jwtPayload = {
      id: user._id,
    };

    const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "30m" });
    const refreshToken = jwt.sign(jwtPayload, "refreshSecret", {
      expiresIn: "7d",
    });

    // Send response with tokens
    return res.status(200).json({
      message: "Successfully logged in",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Failed to sign in." });
  }
};

exports.SignIn = SignIn;
