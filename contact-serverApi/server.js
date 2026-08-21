

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://msaifkhan01.github.io",
      "http://127.0.0.1:5500",
       "http://localhost:5173"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// // IMPORTANT: allow preflight
// app.options("/*", cors());


// app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Email server running ✅");
});

// Contact Form Route
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and Message are required",
    });
  }

  // // 🚀 Respond immediately (fast UX)
  // res.status(200).json({
  //   success: true,
  //   message: "Message received successfully",
  // });

  try {
    // ✅ CREATE TRANSPORTER INSIDE REQUEST (IMPORTANT)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ============================
    // 1️⃣ Email to YOU (Owner)
    // ============================
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Portfolio Contact",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:10px; }
    .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
    .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:15px; text-align:center; color:#fff; }
    .header h1 { margin:0; font-size:20px; }
    .body { padding:15px; }
    .info { margin-bottom:8px; }
    .label { font-weight:600; color:#00b894; display:inline-block; min-width:90px; }
    .message-box { background:#f1f2f6; border-left:4px solid #0984e3; padding:15px; border-radius:10px; margin-top:12px; white-space:pre-line; }
    .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📩 New Portfolio Message</h1>
      <p>Someone contacted you via your portfolio website</p>
    </div>
    <div class="body">
      <div class="info"><span class="label">Name:</span> ${name || "Not provided"}</div>
      <div class="info"><span class="label">Email:</span> ${email}</div>
      <div class="info"><span class="label">Subject:</span> ${subject || "No Subject"}</div>
      <div class="info"><span class="label">Time:</span> ${new Date().toLocaleString()}</div>
      <div class="message-box"><b>Message:</b><br/>${message}</div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
    </div>
  </div>
</body>
</html>
      `,
    });

    // ============================
    // 2️⃣ Acknowledgement Email to USER
    // ============================
    await transporter.sendMail({
      from: `"Mohd Saif Khan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting me 🙏",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:10px; }
    .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
    .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:15px; text-align:center; color:#fff; }
    .header h1 { margin:0; font-size:20px; }
    .body { padding:25px; color:#2d3436; }
    .message-box { background:#f1f2f6; border-left:4px solid #00b894; padding:10px; border-radius:12px; margin-top:8px; white-space:pre-line; }
    .social { margin-top:15px; text-align:center; }
    .social a { margin:0 10px; text-decoration:none; display:inline-block; }
    .social img { width:32px; height:32px; vertical-align:middle; }
    .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thanks for Contacting Me 🙏</h1>
      <p>I have received your message</p>
    </div>
    <div class="body">
      <p>Hi <b style="color:#0984e3;">${name || "there"}</b>,</p>
      <p>Thanks for reaching out through my portfolio website. I’ll get back to you shortly 🚀</p>
      <div class="message-box">
        <b>Your Message:</b><br/>${message}
      </div>
      <div class="social">
        <p style="margin-bottom:10px;">You can also reach out to me here:</p>
        <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
        </a>
        <a href="https://github.com/MSaifKhan01" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        </a>
        <a href="https://wa.me/9315718415" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" />
        </a>
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
    </div>
  </div>
</body>
</html>
      `,
    });

    console.log("📧 Emails sent successfully");

  // 🚀 Respond immediately (fast UX)
  res.status(200).json({
    success: true,
    message: "Message received successfully",
  });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

