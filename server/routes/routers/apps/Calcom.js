const express = require("express");
const querystring = require("querystring");
const router = express.Router();
const axios = require("axios");

// Replace with your Cal.com credentials
const CLIENT_ID = process.env.CALCOM_API_KEY;
const REDIRECT_URI = `${process.env.SERVER_BASE_URL}/api/calcom/auth/calcom/callback`; // Adjust based on your environment
const CLIENT_SECRETE = process.env.CALCOM_LICENCE_KEY;
// Step 1: Redirect to Cal.com for authorization
router.get("/auth/calcom", (req, res) => {
  const authUrl = `https://cal.com/oauth/authorize?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "read write", // Adjust scopes based on what your app needs
  })}`;
  res.redirect(authUrl);
});

//callback
router.get("/auth/calcom/callback", async (req, res) => {
  const { code } = req.query; // Get the authorization code from the query

  try {
    // Step 2: Exchange authorization code for access token
    const tokenResponse = await axios.post("https://cal.com/oauth/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRETE, // Use your Client Secret
      redirect_uri: REDIRECT_URI,
      code: code,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Store the access token and refresh token in your database associated with the user
    // e.g., userTokens[req.session.userId] = { access_token, refresh_token };

    res.json({ message: "Successfully authenticated", access_token });
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    res.status(500).json({ error: "Failed to authenticate with Cal.com" });
  }
});

//shedule events
router.post("/schedule-event", async (req, res) => {
  const { userId, eventDetails } = req.body; // Get event details from the frontend

  // Retrieve access token from your storage
  const { access_token } = userTokens[userId];
  if (!access_token) {
    return res.status(403).json({ error: "User not authenticated" });
  }

  try {
    const response = await axios.post(
      "https://api.cal.com/v1/schedule",
      eventDetails,
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Use access token for authentication
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data); // Return the response from Cal.com
  } catch (error) {
    console.error("Error scheduling event:", error);
    res.status(500).json({ error: "Failed to schedule event" });
  }
});

module.exports = router;
