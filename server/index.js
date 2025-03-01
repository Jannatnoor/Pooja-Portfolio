import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { testEmailConfig } from "./config/email.config.js";
import { validateContact } from "./middleware/middleware.validatecontact.js";
//import { validateContact } from "./middleware/middleware.validatecontact.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

app.post("/api/contact", validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_RECIPIENT, // Your email where you want to receive messages
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "There was an error sending your message. Please try again.",
    });
  }
});

testEmailConfig().then((isConfigured) => {
  if (isConfigured) {
    console.log("✅ Email service ready");
  } else {
    console.error("❌ Email service not configured properly");
  }
});

app.listen(port, () => {
  console.log(`👀 Server is running on http://localhost:${port}`);
});

export default app;
