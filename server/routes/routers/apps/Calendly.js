const express = require("express");
const axios = require("axios");
const router = express.Router();

const CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SERVER_BASE_URL;

router.get("/test", (req, res) => {
  res.status(201).json({ success: true });
});

router.get("/connect-calendly", (req, res) => {
  const authUrl = `https://calendly.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}/auth/calendly/callback`;
  res.redirect(authUrl);
});

router.get("/auth/calendly/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post("https://calendly.com/oauth/token", {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: `${REDIRECT_URI}/auth/calendly/callback`,
      grant_type: "authorization_code",
    });
    const { access_token } = response.data;
    // Store access_token securely
    res.send("Calendly account connected successfully!");
  } catch (error) {
    res.status(500).send("Error connecting to Calendly");
  }
});

module.exports = router;
