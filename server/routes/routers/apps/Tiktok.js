const express = require("express");
const axios = require("axios");
const router = express.Router();

const tikTokClientId = "YOUR_TIKTOK_CLIENT_ID";
const tikTokClientSecret = "YOUR_TIKTOK_CLIENT_SECRET";
const tikTokRedirectUri = "YOUR_TIKTOK_REDIRECT_URI";

router.get("/test", (req, res) => {
  res.status(201).json({ success: true });
});

router.get("/auth/tiktok", (req, res) => {
  const tikTokAuthUrl = `https://www.tiktok.com/auth/authorize?${querystring.stringify(
    {
      client_key: tikTokClientId,
      redirect_uri: tikTokRedirectUri,
      scope: "user.info.basic",
      response_type: "code",
    }
  )}`;
  res.redirect(tikTokAuthUrl);
});

router.get("/auth/tiktok/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://open-api.tiktok.com/oauth/access_token",
      {
        client_key: tikTokClientId,
        client_secret: tikTokClientSecret,
        grant_type: "authorization_code",
        redirect_uri: tikTokRedirectUri,
        code,
      }
    );

    res.send(
      `<script>window.opener.postMessage(${JSON.stringify(
        response.data
      )}, '*'); window.close();</script>`
    );
  } catch (error) {
    res.status(500).send("TikTok login failed");
  }
});

module.exports = router;