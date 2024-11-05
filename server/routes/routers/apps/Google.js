const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Google Client ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRETE; // Google Client Secret
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URL; // Redirect URI for callback
const client = new OAuth2Client(CLIENT_ID);

// Define Google OAuth 2.0 Scopes
const googleScopes = [
  "openid", // Required for ID token
  "profile", // Access to basic profile information
  // "https://www.googleapis.com/auth/gmail.readonly", // Gmail (Read-only)
  // "https://www.googleapis.com/auth/drive", // Google Drive (Read/Write)
  // "https://www.googleapis.com/auth/documents", // Google Docs (Read/Write)
  // "https://www.googleapis.com/auth/spreadsheets", // Google Sheets (Read/Write)
  // "https://www.googleapis.com/auth/calendar", // Google Calendar (includes Meet access)
];

// Step 1: Redirect user to Google OAuth endpoint
router.get("/auth/google", (req, res) => {
  const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth?";
  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: googleScopes.join(" "),
    access_type: "offline",
    prompt: "consent", // Forces the user to re-approve the app to ensure refresh tokens are granted
  });

  // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(
  //   {
  //     client_id: CLIENT_ID,
  //     redirect_uri: REDIRECT_URI,
  //     response_type: "code",
  //     scope: googleScopes.join(" "),
  //     access_type: "offline",
  //     prompt: "consent", // Forces the user to re-approve the app to ensure refresh tokens are granted
  //   }
  // )}`;

  const authUrl = `${authEndpoint}${queryParams}`;
  res.redirect(authUrl);
  // res.redirect(googleAuthUrl);
});

// Endpoint for Google OAuth callback
router.get("/auth/google/callback", async (req, res) => {
  const tokenEndpoint = "https://oauth2.googleapis.com/token";

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code missing." });
  }

  const requestBody = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const options = {
    method: "POST",
    url: tokenEndpoint,
    data: requestBody,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    // Exchange authorization code for tokens
    const response = await axios(options);

    const { access_token, id_token, refresh_token, expires_in } = response.data;

    req.session.accessToken = access_token;
    req.session.refreshToken = refresh_token;
    req.session.id_token = id_token;
    req.session.tokenExpiry = Date.now() + expires_in * 1000;

    res.redirect("/user");
  } catch (error) {
    console.error("Error during Google OAuth callback:", error.data);
    console.error("Error during Google OAuth callback:", error.data.message);
    console.error("Error during Google OAuth callback:", error);
    return res
      .status(500)
      .json({ error: "Failed to authenticate with Google." });
  }
});

// Middleware to check and refresh the token if expired
const ensureAuthenticated = async (req, res, next) => {
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      const newAccessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = newAccessToken;
      req.session.tokenExpiry = Date.now() + 3600 * 1000; // Assuming 1-hour expiry
    } catch (error) {
      console.error("Error refreshing access token:", error.message);
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }
  }
  next();
};

// Function to check if token is expired
const isTokenExpired = (expiryTime) => Date.now() > expiryTime;

// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  return response.data.access_token; // Return the new access token
};

// Use middleware in routes where authentication is required
router.get("/user", ensureAuthenticated, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    accessToken: req.session.accessToken,
  });
});

// Step 4: Example Gmail API request (list user's emails)
router.get("/gmail/messages", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  try {
    const gmailResponse = await axios.get(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(gmailResponse.data);
  } catch (error) {
    console.error("Error fetching Gmail messages:", error);
    res.status(500).json({ error: "Failed to fetch Gmail messages" });
  }
});

// Step 4a: Example Google Drive API request (list user's files)
router.get("/drive/files", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  try {
    const driveResponse = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(driveResponse.data);
  } catch (error) {
    console.error("Error fetching Drive files:", error);
    res.status(500).json({ error: "Failed to fetch Drive files" });
  }
});

// Step 4b: Example Google Docs API request (get document content)
router.get("/docs/:documentId", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens
  const { documentId } = req.params;

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  try {
    const docsResponse = await axios.get(
      `https://docs.googleapis.com/v1/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(docsResponse.data);
  } catch (error) {
    console.error("Error fetching Google Doc:", error);
    res.status(500).json({ error: "Failed to fetch Google Doc" });
  }
});

// Step 4c: Example Google Sheets API request (get spreadsheet content)
router.get("/sheets/:spreadsheetId", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens
  const { spreadsheetId } = req.params;

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  try {
    const sheetsResponse = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(sheetsResponse.data);
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    res.status(500).json({ error: "Failed to fetch Google Sheet" });
  }
});

// Step 4d: Example Google Calendar API request (list events for Google Meet)
router.get("/calendar/events", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  try {
    const calendarResponse = await axios.get(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(calendarResponse.data);
  } catch (error) {
    console.error("Error fetching Calendar events:", error);
    res.status(500).json({ error: "Failed to fetch Calendar events" });
  }
});

// Step 4e: Example Google Calendar API request (create Google Meet event)
router.post("/calendar/events/create", async (req, res) => {
  let accessToken = req.session.accessToken; // Retrieve this from your stored tokens

  // Check if token is expired and refresh it
  if (isTokenExpired(req.session.tokenExpiry)) {
    try {
      accessToken = await refreshAccessToken(req.session.refreshToken);
      req.session.accessToken = accessToken; // Update the access token in the session
      req.session.tokenExpiry = Date.now() + 3599 * 1000; // Update expiry time (1 hour)
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }

  const event = {
    summary: "Google Meet Event",
    description: "Google Meet event description",
    start: {
      dateTime: "2024-10-24T10:00:00-07:00", // Start time in RFC3339 format
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2024-10-24T11:00:00-07:00", // End time in RFC3339 format
      timeZone: "America/Los_Angeles",
    },
    conferenceData: {
      createRequest: {
        requestId: "uniqueRequestId",
      },
    },
  };

  try {
    const calendarResponse = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      event,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(calendarResponse.data);
  } catch (error) {
    console.error("Error creating Google Meet event:", error);
    res.status(500).json({ error: "Failed to create Google Meet event" });
  }
});

module.exports = router;
