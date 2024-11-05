const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// Function to generate random strings
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// Step 1: Redirect to Twitter Authorization URL
router.get("/auth/twitter", (req, res) => {
  const codeVerifier = generateRandomString(32);
  const state = generateRandomString(16);
  console.log("Generated codeVerifier:", codeVerifier, "and state:", state);

  // Create a JWT token with the state and code verifier
  const token = jwt.sign(
    { oauthState: state, codeVerifier },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set cookies for codeVerifier and state
  res.cookie("codeVerifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });
  res.cookie("oauthState", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });

  // Build the authorization URL
  const authorizeUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_CLIENT_ID}&redirect_uri=${process.env.SERVER_BASE_URL}/api/twitter/callback/twitter&scope=tweet.read%20tweet.write&state=${token}&code_challenge=${codeVerifier}&code_challenge_method=plain`;

  console.log("Redirecting to authorization URL:", authorizeUrl);
  res.redirect(authorizeUrl);
});

// Step 2: Handle Twitter Callback
router.get("/callback/twitter", async (req, res) => {
  const { code, state: token } = req.query;

  // Verify if the token is a valid JWT token
  if (!token || !token.startsWith("eyJ")) {
    console.error("Invalid state token");
    return res.status(403).send("Invalid state");
  }

  // Verify and decode the JWT
  let decodedToken;
  try {
    console.log("Verifying JWT...");
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT verified. Decoded token:", decodedToken);
  } catch (error) {
    console.error("Invalid JWT error:", error);
    return res.status(403).send("Invalid state.");
  }

  const returnedState = decodedToken.oauthState; // This should already match the decoded state
  const codeVerifier = decodedToken.codeVerifier; // Make sure this is available in the decoded token
  console.log("Returned state from token:", returnedState);
  console.log("Code verifier from token:", codeVerifier);

  // Check if state matches
  if (returnedState !== decodedToken.oauthState) {
    console.error(
      "State does not match. Expected:",
      returnedState,
      "but got:",
      decodedToken.oauthState
    );
    return res.status(403).send("State does not match.");
  } else {
    console.log("State matches.");
  }

  // Proceed only if code is defined
  if (!code) {
    console.error("Authorization code is missing.");
    return res.status(400).send("Authorization code is missing.");
  } else {
    console.log("Authorization code found:", code);
  }

  // Create Basic Auth header
  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  console.log("Basic Auth header created.");

  // Verify the authorization code with the Twitter API
  try {
    const response = await axios.get(`https://api.twitter.com/2/oauth2/token`, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
      params: {
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.SERVER_BASE_URL}/api/twitter/callback/twitter`,
      },
    });

    console.log("Authorization code verified successfully.");
  } catch (error) {
    console.error(
      "Error verifying authorization code:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).send("Error verifying authorization code");
  }

  // Make request to exchange authorization code for access token
  try {
    const tokenResponse = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      querystring.stringify({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.SERVER_BASE_URL}/api/twitter/callback/twitter`,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    console.log("Token response received:", tokenResponse.data);

    // Set access and refresh tokens as cookies
    res.cookie("accessToken", tokenResponse.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });
    res.cookie("refreshToken", tokenResponse.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 1 week
    });

    console.log("Access Token set in cookies.");
    console.log("Refresh Token set in cookies.");

    // Send success response with token data
    return res.status(200).send({
      message: "Authorization successful! You can now use the Twitter API.",
      tokenData: tokenResponse.data, // Include token data in the response
    });
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response ? error.response.data : error.message
    );
    console.log("Error exchanging code for token:", error);
    return res.status(500).send("Error exchanging code for token");
  }
});

// Step 4: Make an API request using the access token
router.get("/profile", async (req, res) => {
  const accessToken = req.cookies.accessToken; // Access token from cookies

  if (!accessToken) {
    return res.status(401).send("Not authorized");
  }

  try {
    const twitterResponse = await axios.get(
      "https://api.twitter.com/2/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(twitterResponse.data);
  } catch (error) {
    console.error("Error fetching Twitter profile:", error);
    res.status(500).send("Error fetching Twitter profile");
  }
});

// Example route to get user messages (Direct Messages)
router.get("/twitter/dms", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1]; // Bearer token

  try {
    const dmsResponse = await axios.get("https://api.twitter.com/2/dm_events", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(dmsResponse.data);
  } catch (error) {
    console.error("Error fetching DMs:", error);
    res.status(500).send("Failed to fetch messages");
  }
});

// Example route to send a message
router.post("/twitter/dms", async (req, res) => {
  const { recipientId, message } = req.body;
  const accessToken = req.headers.authorization.split(" ")[1]; // Bearer token

  try {
    const sendMessageResponse = await axios.post(
      "https://api.twitter.com/2/dm_events",
      {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: recipientId },
            message_data: { text: message },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(sendMessageResponse.data);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Failed to send message");
  }
});

router.post("/twitter/webhook", (req, res) => {
  // Handle the CRC token challenge
  if (req.body.crc_token) {
    const crc_token = req.body.crc_token;
    const hash = crypto
      .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET) // Use your consumer secret
      .update(crc_token)
      .digest("base64");

    // Respond to the CRC challenge
    res.status(200).json({ response_token: `sha256=${hash}` });
    return;
  }

  // Handle incoming event data from Twitter
  const event = req.body;

  // Process different types of events
  if (event.tweet_create_events) {
    // Handle tweet events
    event.tweet_create_events.forEach((tweetEvent) => {
      console.log("New Tweet Event:", tweetEvent);
      // You can send notifications or take actions based on the event
    });
  }

  // Respond to Twitter to acknowledge receipt
  res.status(200).send("Event received");
});

module.exports = router;
