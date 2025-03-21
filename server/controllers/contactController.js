import { validationResult } from "express-validator";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { transporter } from "../config/email.config.js";

// In-memory storage for temporary submissions
const tempSubmissions = new Map();

// Create email template functions
export const createVerificationEmailTemplate = (data) => {
  const { name, email, verificationLink } = data;

  return {
    from: `"Portfolio Contact" <${process.env.EMAIL_RECIPIENT}>`,
    to: email,
    subject: "Verify Your Message Submission",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Hello ${name},</p>
        <p>Someone (possibly you) submitted a message through your portfolio contact form.</p>
        <p>To verify and send the message, please click the link below:</p>
        <p style="text-align: center;">
          <a href="${verificationLink}" 
             style="display: inline-block; 
                    background-color: #14b8a6; 
                    color: white; 
                    padding: 10px 20px; 
                    text-decoration: none; 
                    border-radius: 5px;">
            Verify Message
          </a>
        </p>
        <p>If you did not submit this message, please ignore this email.</p>
        <p>This verification link will expire in 15 minutes.</p>
      </div>
    `,
    text: `
      Email Verification for Portfolio Contact Form
      
      Hello ${name},
      
      To verify your message, please visit: ${verificationLink}
      
      If you did not submit this message, please ignore this email.
      
      This link will expire in 15 minutes.
    `,
  };
};

// Store temporary submission
const storeTemporarySubmission = (submissionData) => {
  const key = submissionData.verificationToken;

  // Store with expiration
  tempSubmissions.set(key, {
    ...submissionData,
    createdAt: Date.now(),
  });

  // Auto-remove after 15 minutes
  setTimeout(() => {
    tempSubmissions.delete(key);
  }, 15 * 60 * 1000);

  return true;
};

// Retrieve temporary submission
const retrieveTemporarySubmission = (verificationToken) => {
  const submission = tempSubmissions.get(verificationToken);

  // Check if submission exists and is not expired
  if (submission && Date.now() - submission.createdAt < 15 * 60 * 1000) {
    return submission;
  }

  return null;
};

// Remove temporary submission
const removeTemporarySubmission = (verificationToken) => {
  tempSubmissions.delete(verificationToken);
};

// Initial contact submission handler
export const handleContactSubmission = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Construct verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-contact?token=${verificationToken}`;

    // Prepare submission data
    const submissionData = {
      name,
      email,
      subject,
      message,
      verificationToken,
      timestamp: new Date().toISOString(),
    };

    // Store temporary submission
    storeTemporarySubmission(submissionData);

    // Send verification email
    const verificationMailOptions = createVerificationEmailTemplate({
      name,
      email,
      verificationLink,
    });

    // Send verification email
    await transporter.sendMail(verificationMailOptions);

    res.status(200).json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing your submission. Please try again.",
    });
  }
};

// Verification endpoint handler
export const verifyContactSubmission = async (req, res) => {
  try {
    const { token } = req.body;

    // Retrieve submission data
    const submissionData = retrieveTemporarySubmission(token);

    if (!submissionData) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or has expired.",
      });
    }


    // Prepare final email to portfolio owner
    const finalMailOptions = {
      from: `"${submissionData.name} via Portfolio" <${submissionData.email}>`,
      to: process.env.EMAIL_RECIPIENT || "your-email@example.com",
      replyTo: `"${submissionData.name}" <${submissionData.email}>`,
      subject: `Portfolio Contact: ${submissionData.subject}`,
      html: `
          <p style="white-space: pre-line;">${submissionData.message}</p>
      `,
      text: `
        ${submissionData.message}
      `,
    };

    // Send email to portfolio owner
    const info = await transporter.sendMail(finalMailOptions);

    // Remove temporary submission
    removeTemporarySubmission(token);

    // Optional: Get preview URL for development
    let previewUrl;
    if (process.env.NODE_ENV === "development" && info) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    res.status(200).json({
      success: true,
      message: "Message verified and sent successfully!",
      previewUrl,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying your message. Please try again.",
    });
  }
};

export default {
  handleContactSubmission,
  verifyContactSubmission,
};
