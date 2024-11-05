const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const MONGO_URI = process.env.DATABASE_URL;
// const MONGO_URI =
//   "mongodb+srv://harison:IGorc4L08ezqtbdZ@cluster0.yrbg4.mongodb.net/Aii";
const MONGO_URI = "mongodb://localhost:27017/aii";
if (!MONGO_URI) {
  throw new Error("MongoDB URI is not set in environment variables");
}

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected!!!");
    return db;
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
