const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = ForgotPassword = mongoose.model(
  "forgotpassword",
  ForgotPasswordSchema
);
