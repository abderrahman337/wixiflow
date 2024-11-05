const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const router = express.Router();

// Microsoft OAuth Configuration
const microsoftClientId = "YOUR_MICROSOFT_CLIENT_ID"; // Replace with your Microsoft Client ID
const microsoftClientSecret = "YOUR_MICROSOFT_CLIENT_SECRET"; // Replace with your Microsoft Client Secret
const microsoftRedirectUri = "YOUR_MICROSOFT_REDIRECT_URI"; // Replace with your redirect URI

// Route to initiate Microsoft Teams authentication
router.get("/auth/microsoft-teams", (req, res) => {
  const microsoftAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${querystring.stringify(
    {
      client_id: microsoftClientId,
      redirect_uri: microsoftRedirectUri,
      scope: "https://graph.microsoft.com/.default", // Adjust scope as needed
      response_type: "code",
      response_mode: "query",
    }
  )}`;
  res.redirect(microsoftAuthUrl);
});

// Callback route for Microsoft Teams
router.get("/auth/microsoft-teams/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      {
        client_id: microsoftClientId,
        client_secret: microsoftClientSecret,
        grant_type: "authorization_code",
        redirect_uri: microsoftRedirectUri,
        code,
        scope: "https://graph.microsoft.com/.default",
      }
    );

    const { access_token } = response.data;
    res.send(
      `<script>window.opener.postMessage(${JSON.stringify(
        response.data
      )}, '*'); window.close();</script>`
    );
  } catch (error) {
    res.status(500).send("Microsoft Teams login failed");
  }
});

// Add similar routes for Microsoft Word and Outlook as needed...

module.exports = router;
