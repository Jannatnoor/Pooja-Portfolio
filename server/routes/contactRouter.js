import express from "express";
import { validateContact } from "../middleware/middleware.validatecontact.js";
import {  handleContactSubmission } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/contact", validateContact,  handleContactSubmission);

export default contactRouter;
