const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const router = express.Router();

// OAuth Configuration
const stripeClientId = "YOUR_STRIPE_CLIENT_ID"; // Replace with your Stripe Client ID
const stripeClientSecret = "YOUR_STRIPE_CLIENT_SECRET"; // Replace with your Stripe Client Secret
const stripeRedirectUri = "YOUR_STRIPE_REDIRECT_URI"; // Replace with your redirect URI

//test route
router.get("/test", (req, res) => {
    res.status(201).json({ success: true });
});

// Stripe OAuth Configuration
router.get("/auth/stripe", (req, res) => {
  const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?${querystring.stringify(
    {
      response_type: "code",
      client_id: stripeClientId,
      scope: "read_write", // Adjust scope as needed
    }
  )}`;
  res.redirect(stripeAuthUrl);
});

// Callback route for Stripe
router.get("/auth/stripe/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://connect.stripe.com/oauth/token",
      {
        client_id: stripeClientId,
        client_secret: stripeClientSecret,
        code,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = response.data;
    res.send(
      `<script>window.opener.postMessage(${JSON.stringify(
        response.data
      )}, '*'); window.close();</script>`
    );
  } catch (error) {
    res.status(500).send("Stripe login failed");
  }
});


module.exports = router;
