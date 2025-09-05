const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");
const kycRoutes = require("./routes/kycRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📂 'uploads/' folder created automatically");
}

// Static file serving (for uploaded images/docs)
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/kyc", kycRoutes);

// Start DB
connectDB();

module.exports = app;
