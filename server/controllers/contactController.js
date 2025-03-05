import { validationResult } from "express-validator";
import { emailConfig, transporter } from "../config/email.config.js";
import nodemailer from "nodemailer";

export const createEmailTemplate = (data) => {
  const { name, email, subject, message } = data;

  // Get current timestamp for record-keeping
  //   const timestamp = new Date().toISOString();

  return {
    from: emailConfig.from,
    to: process.env.EMAIL_RECIPIENT || "your-email@example.com",
    subject: `${subject}`,
    html: `
            
        <p style="white-space: pre-line;"> ${message}</p>

        
    `,
    // Include text version for email clients that don't support HTML
    text: `
      Hi,

      ${message}
      
      Sent from your portfolio website on ${new Date().toLocaleString()}
    `,
  };
};

export const createTestAccount = async () => {
  if (process.env.NODE_ENV !== "development") return undefined;

  try {
    // Create test account for development
    const testAccount = await nodemailer.createTestAccount();

    // Log test account credentials for debugging
    console.log("Test account created:", testAccount);

    // Return the preview URL
    return nodemailer.getTestMessageUrl(testAccount);
  } catch (error) {
    console.error("Error creating test account:", error);
    return undefined;
  }
};

export const handleContactSubmission = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    // Create email options using the template
    const mailOptions = createEmailTemplate({
      name,
      email,
      subject,
      message,
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Determine if we need to show a preview URL (for development)
    let previewUrl;
    if (process.env.NODE_ENV === "development" && info) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      previewUrl,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message:
        "There was an error sending your message. Please try again later.",
    });
  }
};
