const mongoose = require("mongoose");
const Shcema = mongoose.Schema;

const SubscriptionSchema = new Shcema({
  name: { type: String },
  total: { type: Number, default: 0 },
  remain: { type: Number, default: 0 },
  plan: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscription = mongoose.model("subscription", SubscriptionSchema);

module.exports = Subscription;
