const stripe = require("stripe")("sk_test_51QHflBCN4YE4A2gtiBLnEmc29y4632hswWoHaKUoZlTxhHrNRW0qMwIiwKHk2yQXkmBAcTp8AHaC7q062hsn9oZ400E3xdAKRh");
require("dotenv").config();

const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Handle successful payment
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.json({ received: true });
};

exports.handleWebhook = handleWebhook;
