import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { testEmailConfig } from "./config/email.config.js";
import contactRouter from "./routes/contactRouter.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per 15 minutes
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  return res.json({
    message: "test file",
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD },
});

testEmailConfig().then((isConfigured) => {
  if (isConfigured) {
    console.log("✅ Email service ready");
  } else {
    console.error("❌ Email service not configured properly");
  }
});

app.use("/api", contactRouter);

app.listen(port, () => {
  console.log(`👀 Server is running on http://localhost:${port}`);
});

export default app;
