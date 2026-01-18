// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { google } = require("googleapis");
// require("dotenv").config();

// const app = express();

// // Allowed frontend origins
// const allowedOrigins = [
//   "http://127.0.0.1:5500/index3.html",
//   "https://msaifkhan01.github.io",
//   "http://127.0.0.1:5500",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.use(bodyParser.json());

// // const { google } = require("googleapis");
// require("dotenv").config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: "offline",
//   prompt: "consent", // 🔥 VERY IMPORTANT
//   scope: SCOPES,
// });

// console.log("Authorize this URL:", authUrl);

// // const oAuth2Client = new google.auth.OAuth2(
// //   process.env.CLIENT_ID,
// //   process.env.CLIENT_SECRET,
// //   process.env.REDIRECT_URI
// // );
// // oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   try {
//     const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

//     // Encode email as base64
//     function makeBody(to, from, subject, message) {
//       const str = [
//         `To: ${to}`,
//         `From: ${from}`,
//         `Subject: ${subject}`,
//         "MIME-Version: 1.0",
//         "Content-Type: text/html; charset=utf-8",
//         "",
//         message,
//       ].join("\n");

//       return Buffer.from(str).toString("base64url");
//     }

//     // 1️⃣ Send mail to YOU
//     await gmail.users.messages.send({
//       userId: "me",
//       requestBody: {
//         raw: makeBody(
//           process.env.EMAIL_USER,
//           process.env.EMAIL_USER,
//           subject || "New Portfolio Contact",
//           `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8" />
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:20px; }
//     .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
//     .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:25px; text-align:center; color:#fff; }
//     .header h1 { margin:0; font-size:24px; }
//     .body { padding:25px; }
//     .info { margin-bottom:15px; }
//     .label { font-weight:600; color:#00b894; display:inline-block; min-width:90px; }
//     .message-box { background:#f1f2f6; border-left:4px solid #0984e3; padding:15px; border-radius:10px; margin-top:20px; white-space:pre-line; }
//     .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>📩 New Portfolio Message</h1>
//       <p>Someone contacted you via your portfolio website</p>
//     </div>
//     <div class="body">
//       <div class="info"><span class="label">Name:</span> ${
//         name || "Not provided"
//       }</div>
//       <div class="info"><span class="label">Email:</span> ${email}</div>
//       <div class="info"><span class="label">Subject:</span> ${
//         subject || "No Subject"
//       }</div>
//       <div class="info"><span class="label">Time:</span> ${new Date().toLocaleString()}</div>
//       <div class="message-box"><b>Message:</b><br/>${message}</div>
//     </div>
//     <div class="footer">
//       © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
//     </div>
//   </div>
// </body>
// </html>`
//         ),
//       },
//     });

//     // 2️⃣ Send Acknowledgment to Visitor
//     await gmail.users.messages.send({
//       userId: "me",
//       requestBody: {
//         raw: makeBody(
//           email,
//           process.env.EMAIL_USER,
//           "Thanks for Contacting Me",
//           `
//           <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8" />
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:20px; }
//     .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
//     .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:30px; text-align:center; color:#fff; }
//     .header h1 { margin:0; font-size:26px; }
//     .body { padding:30px; color:#2d3436; }
//     .message-box { background:#f1f2f6; border-left:4px solid #00b894; padding:20px; border-radius:12px; margin-top:15px; white-space:pre-line; }
//     .social { margin-top:25px; text-align:center; }
//     .social a { margin:0 10px; text-decoration:none; display:inline-block; }
//     .social img { width:32px; height:32px; vertical-align:middle; }
//     .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Thanks for Contacting Me 🙏</h1>
//       <p>I have received your message</p>
//     </div>
//     <div class="body">
//       <p>Hi <b style="color:#0984e3;">${name || "there"}</b>,</p>
//       <p>Thanks for reaching out through my portfolio website. I’ll get back to you shortly 🚀</p>
//       <div class="message-box">
//         <b>Your Message:</b><br/>${message}
//       </div>
//       <div class="social">
//         <p style="margin-bottom:10px;">You can also reach out to me here:</p>
//         <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn"></a>
//         <a href="https://github.com/MSaifKhan01" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub"></a>
//         <a href="https://wa.me/9315718415" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp"></a>
//       </div>
//     </div>
//     <div class="footer">
//       © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
//     </div>
//   </div>
// </body>
// </html>`
//         ),
//       },
//     });

//     res.json({ message: "Emails sent successfully" });
//   } catch (err) {
//     console.error("❌ Gmail API error:", err);
//     res.status(500).json({ message: "Failed to send message" });
//   }
// });

// app.listen(5000, () =>
//   console.log("🚀 Server running on http://localhost:5000")
// );




// ///////v1----------------


// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // SMTP Transporter (GMAIL APP PASSWORD)
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Email server running ✅");
// });

// // Contact Form Route
// app.post("/send-email", async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, Email and Message are required",
//       });
//     }

//     // 1️⃣ Email to YOU (Owner)
//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       // subject: subject || "New Contact Form Message",
//       // html: `
//       //   <h2>New Contact Message</h2>
//       //   <p><b>Name:</b> ${name}</p>
//       //   <p><b>Email:</b> ${email}</p>
//       //   <p><b>Message:</b></p>
//       //   <p>${message}</p>
//       // `,

//       subject: subject || "New Portfolio Contact",
//       html: `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8" />
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:10px; }
//     .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
//     .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:15px; text-align:center; color:#fff; }
//     .header h1 { margin:0; font-size:20px; }
//     .body { padding:15px; }
//     .info { margin-bottom:8px; }
//     .label { font-weight:600; color:#00b894; display:inline-block; min-width:90px; }
//     .message-box { background:#f1f2f6; border-left:4px solid #0984e3; padding:15px; border-radius:10px; margin-top:12px; white-space:pre-line; }
//     .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>📩 New Portfolio Message</h1>
//       <p>Someone contacted you via your portfolio website</p>
//     </div>
//     <div class="body">
//       <div class="info"><span class="label">Name:</span> ${
//         name || "Not provided"
//       }</div>
//       <div class="info"><span class="label">Email:</span> ${email}</div>
//       <div class="info"><span class="label">Subject:</span> ${
//         subject || "No Subject"
//       }</div>
//       <div class="info"><span class="label">Time:</span> ${new Date().toLocaleString()}</div>
//       <div class="message-box"><b>Message:</b><br/>${message}</div>
//     </div>
//     <div class="footer">
//       © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
//     </div>
//   </div>
// </body>
// </html>
// `,
//     });

//     // 2️⃣ Acknowledgement Email to USER
//     await transporter.sendMail({
//       from: `"Mohd Saif Khan" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Thanks for contacting me 🙏",
//       // html: `
//       //   <p>Hi ${name},</p>
//       //   <p>Thank you for reaching out. I have received your message and will get back to you shortly.</p>
//       //   <br />
//       //   <p>Regards,</p>
//       //   <p><b>Mohd Saif Khan</b></p>
//       // `,

//       html: `
//           <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8" />
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     body { font-family: 'Poppins', sans-serif; background:#f8f9fa; margin:0; padding:10px; }
//     .container { max-width:600px; margin:auto; background:#fff; border-radius:20px; box-shadow:0 8px 25px rgba(0,0,0,0.1); overflow:hidden; }
//     .header { background:linear-gradient(135deg,#0984e3,#00b894); padding:15px; text-align:center; color:#fff; }
//     .header h1 { margin:0; font-size:20px; }
//     .body { padding:25px; color:#2d3436; }
//     .message-box { background:#f1f2f6; border-left:4px solid #00b894; padding:10px; border-radius:12px; margin-top:8px; white-space:pre-line; }
//     .social { margin-top:15px; text-align:center; }
//     .social a { margin:0 10px; text-decoration:none; display:inline-block; }
//     .social img { width:32px; height:32px; vertical-align:middle; }
//     .footer { background:#161b22; color:#8b949e; padding:15px; text-align:center; font-size:13px; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Thanks for Contacting Me 🙏</h1>
//       <p>I have received your message</p>
//     </div>
//     <div class="body">
//       <p>Hi <b style="color:#0984e3;">${name || "there"}</b>,</p>
//       <p>Thanks for reaching out through my portfolio website. I’ll get back to you shortly 🚀</p>
//       <div class="message-box">
//         <b>Your Message:</b><br/>${message}
//       </div>
//       <div class="social">
//         <p style="margin-bottom:10px;">You can also reach out to me here:</p>
//         <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn"></a>
//         <a href="https://github.com/MSaifKhan01" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub"></a>
//         <a href="https://wa.me/9315718415" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp"></a>
//       </div>
//     </div>
//     <div class="footer">
//       © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
//     </div>
//   </div>
// </body>
// </html>`,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Emails sent successfully",
//     });
//   } catch (error) {
//     console.error("Email Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//     });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Transporter (Created ONCE)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter once (optional but good)
transporter.verify()
  .then(() => console.log("✅ SMTP Server Ready"))
  .catch(err => console.error("❌ SMTP Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Email server running ✅");
});

// Contact Form Route
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if ( !email || !message) {
    return res.status(400).json({
      success: false,
      message: " Email and Message are required",
    });
  }

  // 🚀 RESPOND IMMEDIATELY (FAST UX)
  res.status(200).json({
    success: true,
    message: "Message received successfully",
  });

  // 🔥 SEND EMAILS IN BACKGROUND (NON-BLOCKING)
  try {
    await Promise.all([
      // 1️⃣ Email to YOU (Owner)
      transporter.sendMail({
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
      }),

      // 2️⃣ Acknowledgement Email to USER
      transporter.sendMail({
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
      }),
    ]);

    console.log("📧 Emails sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
