const express = require("express");
const querystring = require("querystring");
const router = express.Router();
const axios = require("axios");

const CLIENT_ID = process.env.SLACK_CLIENT_ID; // Slack App Client ID
const REDIRECT_URI = "http://localhost:8888/api/slack/auth/slack/callback"; // Your redirect URI
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRETE; // Slack App Client Secret

// Step 1: Redirect user to Slack for OAuth authentication
router.get("/auth/slack", (req, res) => {
  const slackAuthorizationUrl = `https://slack.com/oauth/v2/authorize?${querystring.stringify(
    {
      client_id: CLIENT_ID,
      scope: "channels:read chat:write", // Scopes you want to request
      redirect_uri: REDIRECT_URI,
    }
  )}`;

  res.redirect(slackAuthorizationUrl);
});

// Step 2: Handle the callback and exchange the authorization code for an access token
router.get("/auth/slack/callback", async (req, res) => {
  const { code } = req.query; // Get the authorization code from the query params

  try {
    // Step 3: Exchange authorization code for an access token
    const tokenResponse = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code, // The authorization code from Slack
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Save the access token securely (e.g., in your database)
    console.log("Access Token:", access_token);

    // Step 4: Use the access token to interact with the Slack API
    res.json({ access_token });
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    res.status(500).json({ error: "Failed to authenticate with Slack" });
  }
});

module.exports = router;
