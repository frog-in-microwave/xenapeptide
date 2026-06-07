import express from "express";
import dotenv from "dotenv";
import validator from "validator";
import { Resend } from "resend";

import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", rateLimiter, async (req, res) => {
  try {
    const { name, email, message, phone, honeyPot } = req.body;

    // Hidden field for bot detection
    if (honeyPot) {
      return res.status(400).json({
        message: "Bot detected",
      });
    }

    // Required fields validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const formattedMessage = `
Name: ${name}
Email: ${email}
Phone Number: ${phone || "Not provided"}

Message:
${message}
`;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // change later after verifying your domain
      to: process.env.EMAIL_ADRESS,
      subject: "New contact form submission",
      text: formattedMessage,
      replyTo: email,
    });

    if (error) {
      console.error("Resend Error:", error);

      return res.status(500).json({
        message: "Failed to send email",
        error,
      });
    }

    res.status(200).json({
      message: "Email sent successfully",
      data,
    });
  } catch (err) {
    console.error("Error in submitting contact form:", err);

    res.status(500).json({
      message: "Error in submitting contact form",
      error: err.message,
    });
  }
});

export default router;
