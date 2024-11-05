const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Step 1: Redirect to Instagram for authorization
router.get("/auth/instagram", (req, res) => {
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(instagramAuthUrl);
});

// Step 2: Handle Instagram OAuth callback
router.get("/callback/instagram", async (req, res) => {
  const { code } = req.query;

  try {
    // Step 3: Exchange code for access token
    const tokenResponse = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code,
      }
    );

    const { access_token, user_id } = tokenResponse.data;

    // Save access_token securely
    res.json({ access_token, user_id });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).send("OAuth Authentication failed");
  }
});

// Example route to get Instagram messages (if permissions allow)
router.get("/instagram/messages", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1]; // Bearer token

  try {
    const messageResponse = await axios.get(
      `https://graph.instagram.com/me/messages`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(messageResponse.data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Failed to fetch Instagram messages");
  }
});

// Example route to get notifications or media updates (if permissions allow)
router.get("/instagram/notifications", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1]; // Bearer token

  try {
    const notificationResponse = await axios.get(
      `https://graph.instagram.com/me/media`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(notificationResponse.data);
  } catch (error) {
    console.error("Error fetching Instagram notifications:", error);
    res.status(500).send("Failed to fetch Instagram notifications");
  }
});

module.exports = router;
