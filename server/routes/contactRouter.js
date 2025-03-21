import express from "express";
import rateLimit from "express-rate-limit";

import { validateContact } from "../middleware/middleware.validatecontact.js";
import {
  handleContactSubmission,
  verifyContactSubmission,
} from "../controllers/contactController.js";
// import { verifyCaptcha } from '../middleware/middleware.verifyCaptcha.js';

const contactRouter = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many contact attempts. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

contactRouter.post(
  "/contact",
  contactLimiter, // Rate limiting
  validateContact, // Validate input
  // verifyCaptcha,
  handleContactSubmission
);

contactRouter.post("/verify-contact", verifyContactSubmission);

export default contactRouter;
