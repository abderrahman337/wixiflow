require("dotenv").config();
const stripe = require("stripe")("sk_test_51QHflBCN4YE4A2gtiBLnEmc29y4632hswWoHaKUoZlTxhHrNRW0qMwIiwKHk2yQXkmBAcTp8AHaC7q062hsn9oZ400E3xdAKRh");

const createPaymentIntent = async (req, res) => {
  try {
    // console.log("req.body==>", req.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: req.body?.currency || "usd",
    });
    // console.log("paymentIntent==>", paymentIntent);
    return res
      .status(201)
      .json({ clientSecret: paymentIntent.client_secret, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};

exports.createPaymentIntent = createPaymentIntent;
