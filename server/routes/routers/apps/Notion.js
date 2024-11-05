const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const querystring = require("querystring");
const router = express.Router();
const qs = require("qs");

router.get("/test", (req, res) => {
  res.status(201).json({ success: true });
});
const CLIENT_ID = process.env.NOTION_CLIENT_ID;
const CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const REDIRECT_URI = process.env.NOTION_REDIRECT_URI;

// Step 1: Redirect user to Notion OAuth endpoint
router.get("/auth/notion", (req, res) => {
  const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?${querystring.stringify(
    {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
    }
  )}`;

  res.redirect(notionAuthUrl);
});

// Step 2: Handle the Notion OAuth callback and exchange code for tokens
router.get("/auth/callback/notion", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code not found." });
  }

  console.log("Received Authorization Code:", code);

  try {
    // Step 3: Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    console.log("Notion Access Token:", access_token);

    // Respond with the access token
    res.json({ access_token });
  } catch (error) {
    console.error(
      "Error retrieving token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to authenticate with Notion." });
  }
});

// Create task in Notion
router.post("/create-task", async (req, res) => {
  const { title, dueDate, assignees } = req.body;
  const notionToken = "";

  try {
    const response = await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: title } }] },
          Due: { date: { start: dueDate } },
          Assignees: {
            people: assignees.map((user) => ({ object: "user", id: user.id })),
          },
          Status: { select: { name: "Ongoing" } },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${notionToken}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// Schedule reminders using cron job
const scheduleReminder = (task) => {
  cron.schedule("0 9 * * *", () => {
    const today = new Date().toISOString().split("T")[0];
    if (task.dueDate === today) {
      sendReminder(task);
    }
  });
};

// Logic to send reminder notifications
const sendReminder = (task) => {
  // Notification logic (e.g., email, SMS)
  console.log(`Reminder: Task "${task.title}" is due today!`);
};

module.exports = router;
