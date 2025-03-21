import { body } from "express-validator";

export const validateContact = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom((value) => {
      const allowedDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
      ];

      const domain = value.split("@")[1];

      if (!allowedDomains.includes(domain)) {
        throw new Error("Email domain is not allowed");
      }

      return true;
    }),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];
