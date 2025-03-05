// email.config.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Make sure dotenv is initialized
dotenv.config();

/**
 * Creates the appropriate email transporter based on environment
 * @returns {Object} Nodemailer transporter
 */
const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    // Production: Use SendGrid
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey", // This is literally 'apikey' for SendGrid
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  } else {
    // Development: Use Ethereal for testing or Gmail for local testing
    // For real emails in development, use Gmail
    if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
      return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD, // This should be your Gmail app password
        },
      });
    }

    // For fake emails in development (no credentials provided)
    return nodemailer
      .createTestAccount()
      .then((account) => {
        console.log("Created Ethereal test account:", account.user);
        return nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((error) => {
        console.error("Failed to create test account:", error);
        throw error;
      });
  }
};

/**
 * Email configuration object
 */
export const emailConfig = {
  from:
    process.env.NODE_ENV === "production"
      ? process.env.EMAIL_FROM || "your-verified-sender@yourdomain.com" // SendGrid verified sender
      : process.env.EMAIL_USERNAME || "test@example.com", // Development sender
};

/**
 * Tests email configuration
 * @returns {Boolean} True if configuration is valid
 */
export const testEmailConfig = async () => {
  try {
    // Make sure transporter is available
    const tester = await getTransporter();
    await tester.verify();
    console.log(`Email service configured for ${process.env.NODE_ENV}`);
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
};

// Create a promise to hold the transporter
let transporterPromise = null;

/**
 * Gets or creates the transporter
 * @returns {Promise<Object>} Nodemailer transporter
 */
export const getTransporter = async () => {
  if (!transporterPromise) {
    if (typeof createTransporter() === "object") {
      // Regular transporter (not a promise)
      transporterPromise = Promise.resolve(createTransporter());
    } else {
      // Handle async transporter creation (test account)
      transporterPromise = createTransporter();
    }
  }
  return transporterPromise;
};

// For backwards compatibility, immediately create a transporter
export const transporter = createTransporter();
