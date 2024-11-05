const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const request = require('request-promise')
require("dotenv").config();

const connectDB = require("./config/db");

// create a sevrer
const app = express();

// Initialize Socket server
const http = require("http").Server(app);

// config middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'deathwishmankilledbailler',
  resave: false,
  saveUninitialized: true
}))

// config cors
app.use(cors("*"));
// Connect to MongoDB
connectDB();

// import auth Router
const authRouter = require("./routes/routers/auth/router");
const userRouter = require("./routes/routers/users/router");
const paymentRouter = require("./routes/routers/payment/router");
const notionRouter = require("./routes/routers/apps/Notion");
const googleRouter = require("./routes/routers/apps/Google");
const calendlyRouter = require("./routes/routers/apps/Calendly");
const microsoftRouter = require("./routes/routers/apps/Microsoft");
const tiktokRouter = require("./routes/routers/apps/Tiktok");
const slackRouter = require("./routes/routers/apps/Slack");
const whatsappRouter = require("./routes/routers/apps/Whatsapp");
const stripeRouter = require("./routes/routers/apps/Stripe");
const calcomRouter = require("./routes/routers/apps/Calcom");
const twitterRouter = require("./routes/routers/apps/Twitter");
const instagramRouter = require("./routes/routers/apps/Instagram");
// const barbershopRouter = require("./routes/v1/barbershop/router");
// const planRouter = require("./routes/v1/plan/router");
// const serviceRouter = require("./routes/v1/service/router");
// const productsRouter = require("./routes/v1/product/router");
// const chatRouter = require("./routes/v1/chat/router");
// implement individual routes
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/notion", notionRouter);
app.use("/api/google", googleRouter);
app.use("/api/calendly", calendlyRouter);
app.use("/api/microsoft", microsoftRouter);
app.use("/api/tiktok", tiktokRouter);
app.use("/api/slack", slackRouter);
app.use("/api/whatsapp", whatsappRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/calcom", calcomRouter);
app.use("/api/twitter", twitterRouter);
app.use("/api/instagram", instagramRouter);
// app.use("/v1/barbershop", barbershopRouter);
// app.use("/v1/plans", planRouter);
// app.use("/v1/products", productsRouter);
// app.use("/v1/service", serviceRouter);
// app.use("/v1/chats", chatRouter);

const port = process.env.PORT || 8888;

http.listen(port, () => console.log(`AII server is running on port ${port}`));
