



const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allow only your GitHub Pages frontend
app.use(cors({
  origin: "https://msaifkhan01.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(bodyParser.json());

// POST /send-email
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." });
  }

  try {
    // Transporter setup for Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options - send from the user's email
    let mailOptions = {
      from: email, // Use the sender's email
      replyTo: email, // Set reply-to to the sender's email
      to: process.env.EMAIL_USER, // your inbox
      subject: subject || "No Subject",
      text: `
      Name: ${name || "Not provided"}
      Email: ${email}
      Message: ${message}
      `,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00b894;">New Message from Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
