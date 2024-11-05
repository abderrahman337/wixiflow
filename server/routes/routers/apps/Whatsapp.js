const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const router = express.Router();

// OAuth Configuration
const whatsappClientId = "YOUR_WHATSAPP_CLIENT_ID"; // Replace with your WhatsApp Client ID
const whatsappClientSecret = "YOUR_WHATSAPP_CLIENT_SECRET"; // Replace with your WhatsApp Client Secret
const whatsappRedirectUri = "YOUR_WHATSAPP_REDIRECT_URI"; // Replace with your redirect URI

//test route
router.get("/test", (req, res) => {
  res.status(201).json({ success: true });
});

// WhatsApp OAuth Configuration (assuming you have a provider that supports OAuth)
router.get("/auth/whatsapp", (req, res) => {
  const whatsappAuthUrl = `https://example.com/oauth/authorize?${querystring.stringify(
    {
      client_id: whatsappClientId,
      redirect_uri: whatsappRedirectUri,
      scope: "messages", // Adjust scope as needed
    }
  )}`;
  res.redirect(whatsappAuthUrl);
});

// Callback route for WhatsApp
router.get("/auth/whatsapp/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post("https://example.com/oauth/token", {
      client_id: whatsappClientId,
      client_secret: whatsappClientSecret,
      code,
      grant_type: "authorization_code",
    });

    const { access_token } = response.data;
    res.send(
      `<script>window.opener.postMessage(${JSON.stringify(
        response.data
      )}, '*'); window.close();</script>`
    );
  } catch (error) {
    res.status(500).send("WhatsApp login failed");
  }
});

module.exports = router;
