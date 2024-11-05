const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Subscription = require("../../../models/Subscription");

const googleSignIn = async (req, res) => {
  try {
    const { accessToken } = req.body;
    // Make a request to the userinfo.profile endpoint
    // console.log(accessToken);
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // Check if the request was successful
    if (response.ok) {
      // Parse the response as JSON
      const userData = await response.json();

      const existingUser = await User.findOne({
        email: userData.email,
      });
      console.log(existingUser);
      const jwtPayload = {
        id: "id",
      };
      if (existingUser) {
        jwtPayload.id = existingUser._id;
      } else {
        const newUser = new User({
          email: userData.email,
          password: userData.name,
        });

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(userData.email, salt);

        newUser.password = hash;

        const newSubscription = new Subscription({
          total: 0,
          remain: 0,
        });
        const subscription = await newSubscription.save();
        newUser.subscription = subscription._id;
        const savedUser = await newUser.save();

        jwtPayload.id = savedUser._id;
      }

      const accessToken = jwt.sign(jwtPayload, "secret", {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(jwtPayload, "refreshSecret", {
        expiresIn: "7d",
      });
      return res.status(200).json({
        message: "Successfully logged in",
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    console.error("Error during token exchange:", error);
    res
      .status(500)
      .json({ error: "Failed to exchange access token for ID token" });
  }
};
exports.googleSignIn = googleSignIn;
