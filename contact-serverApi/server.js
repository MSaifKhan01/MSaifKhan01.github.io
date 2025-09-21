




const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [

  "http://127.0.0.1:5500/index3.html",
  "https://msaifkhan01.github.io",
  "http://127.0.0.1:5500"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());



const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Encode email as base64
    function makeBody(to, from, subject, message) {
      const str = [
        `To: ${to}`,
        `From: ${from}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=utf-8",
        "",
        message,
      ].join("\n");

      return Buffer.from(str).toString("base64url");
    }

    // 1️⃣ Send mail to you
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: makeBody(
          process.env.EMAIL_USER,
          process.env.EMAIL_USER,
          `📩 New message from ${name || "Visitor"} - ${subject}`,
          `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
        ),
      },
    });

    // 2️⃣ Send acknowledgment back to visitor
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: makeBody(
          email,
          process.env.EMAIL_USER,
          "✅ Thanks for contacting Mohd Saif Khan!",
          `<h2>Thanks ${name || "there"} 🙏</h2><p>I got your message and will reply soon.</p>`
        ),
      },
    });

    res.json({ message: "Emails sent successfully using Gmail API!" });
  } catch (err) {
    console.error("❌ Gmail API error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});


// // Gmail OAuth2 Setup
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// // POST /send-email
// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!email || !message) {
//     return res
//       .status(400)
//       .json({ message: "Email and message are required." });
//   }

//   console.log("Request body:", req.body);

//   try {
//     // Get fresh access token
//     const accessToken = await oAuth2Client.getAccessToken();

//     // Transporter with OAuth2
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL_USER,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });

//     // 1️⃣ Send email to YOU (owner)
//     await transporter.sendMail({
//       from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER, // Your inbox
//       subject: `📩 New message from ${name || "Visitor"} - ${subject}`,
//       html: `
//       <div style="font-family:Poppins,Arial,sans-serif; background:#f9f9f9; padding:20px;">
//         <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:25px;box-shadow:0 6px 20px rgba(0,0,0,0.1);">
//           <h2 style="color:#0984e3;margin-bottom:15px;">New Contact Form Submission 🚀</h2>
//           <p><strong>Name:</strong> ${name || "Not provided"}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
//           <div style="background:#f1f2f6;border-left:4px solid #00b894;padding:15px;border-radius:8px;margin-top:10px;">
//             <p style="margin:0;white-space:pre-line;">${message}</p>
//           </div>
//         </div>
//       </div>`,
//     });

//     console.log("📨 Mail sent to your inbox!");

//     // 2️⃣ Send acknowledgment email back to visitor
//     await transporter.sendMail({
//       from: `"Mohd Saif Khan Portfolio" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "✅ Thanks for contacting Mohd Saif Khan!",
//       html: `
//       <div style="font-family:Poppins,Arial,sans-serif; background:#f8f9fa; padding:20px;">
//         <div style="max-width:600px;margin:auto;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,0.1);overflow:hidden;">
//           <div style="background:linear-gradient(135deg, #0984e3, #00b894); padding:30px; text-align:center; color:white;">
//             <h1 style="margin:0;font-size:26px;">Thank You for Contacting Me!</h1>
//           </div>
//           <div style="padding:30px;">
//             <p>Hi <span style="color:#0984e3;font-weight:600;">${name || "there"}</span>,</p>
//             <p>Thanks for reaching out through my portfolio website. 🙏</p>
//             <p>I’ve received your message and will respond shortly.</p>

//             <div style="background:#f1f2f6;border-left:4px solid #00b894;padding:15px;border-radius:10px;margin-top:20px;white-space:pre-line;">
//               <p style="margin:0;"><strong>Your Message:</strong></p>
//               <p>${message}</p>
//             </div>

//             <p style="margin-top:20px;">Meanwhile, let’s connect on LinkedIn:</p>
//             <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank"
//               style="display:inline-block;background:#0984e3;color:white;padding:12px 20px;border-radius:30px;text-decoration:none;font-weight:600;margin-top:10px;">
//               🔗 Connect on LinkedIn
//             </a>
//           </div>
//           <div style="background:#161b22;padding:15px;text-align:center;color:#8b949e;font-size:14px;">
//             © ${new Date().getFullYear()} Mohd Saif Khan Portfolio
//           </div>
//         </div>
//       </div>`,
//     });

//     console.log("✅ Acknowledgment email sent to visitor!");

//     res.json({ message: "Emails sent successfully!" });
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     res.status(500).json({ message: "Failed to send message." });
//   }
// });

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);

// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Allowed frontend origins
// const allowedOrigins = [
//   "http://127.0.0.1:5500/index3.html",
//   "https://msaifkhan01.github.io",
//   "http://127.0.0.1:5500"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"]
// }));

// app.use(bodyParser.json());

// // POST /send-email
// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!email || !message) {
//     return res.status(400).json({ message: "Email and message are required." });
//   }

//   console.log("Request body:", req.body);

//   try {
//     // Transporter setup for Gmail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Use App Password if 2FA enabled
//       }
//     });

//     // Send acknowledgment email to visitor
//     await transporter.sendMail({
//       from: `"Mohd Saif Khan Portfolio" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "📨 Thanks for contacting Mohd Saif Khan!",
//       html: `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Thank You for Contacting</title>
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     body { font-family: 'Poppins', sans-serif; background:#f8f9fa; color:#2d3436; margin:0; padding:20px; line-height:1.6; }
//     .email-container { max-width:600px; margin:0 auto; background:#fff; border-radius:20px; box-shadow:0 8px 30px rgba(0,0,0,0.1); overflow:hidden; }
//     .email-header { background: linear-gradient(135deg, #0984e3, #00b894); padding:30px; text-align:center; color:white; }
//     .email-header h1 { font-size:28px; margin:0; }
//     .email-body { padding:30px; }
//     .email-body p { font-size:16px; margin-bottom:15px; }
//     .highlight { color:#0984e3; font-weight:600; }
//     .message-box { background:#f1f2f6; border-left:4px solid #00b894; padding:20px; border-radius:10px; margin-top:20px; white-space:pre-line; }
//     .linkedin-link { display:inline-flex; align-items:center; margin-top:25px; text-decoration:none; color:#0984e3; font-weight:600; }
//     .linkedin-link img { width:20px; height:20px; margin-right:8px; }
//     .email-footer { background:#161b22; padding:20px; text-align:center; color:#8b949e; font-size:14px; margin-top:30px; }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//     <div class="email-header"><h1>Thank You for Contacting Me!</h1></div>
//     <div class="email-body">
//       <p>Hi <span class="highlight">${name || "there"}</span>,</p>
//       <p>Thanks for reaching out through my portfolio website. 🙏</p>
//       <p>I’ve received your message and will get back to you as soon as possible.</p>

//       <div class="message-box">
//         <p><strong>Your Message:</strong></p>
//         <p>${message}</p>
//       </div>

//       <p>You can also connect with me on LinkedIn:</p>
//       <a class="linkedin-link" href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank">
//         <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn icon" />
//         Mohd Saif Khan
//       </a>
//     </div>
//     <div class="email-footer">© ${new Date().getFullYear()} Mohd Saif Khan Portfolio</div>
//   </div>
// </body>
// </html>`
//     });

//     console.log("Acknowledgment email sent successfully!");

//     res.json({ message: "Message sent successfully!" });

//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Failed to send message." });
//   }
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));


// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // ✅ Allow only your GitHub Pages frontend
// // app.use(cors({
// //   origin: "https://msaifkhan01.github.io",
// //   methods: ["GET", "POST"],
// //   allowedHeaders: ["Content-Type"]
// // }));


// const allowedOrigins = [
//   "http://127.0.0.1:5500/index3.html",
//   "https://msaifkhan01.github.io",   // GitHub Pages
//   "http://127.0.0.1:5500"            // Local frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"]
// }));
// app.use(bodyParser.json());

// // POST /send-email
// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!email || !message) {
//     return res.status(400).json({ message: "Email and message are required." });
//   }

//   try {
//     // // Transporter setup for Gmail
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });



//   //     const transporter = nodemailer.createTransport({
//   //   host: "smtp.gmail.com",
//   //   port: 587,
//   //   auth: {
//   //     user: process.env.EMAIL_USER,
//   //     pass: process.env.EMAIL_PASS,
//   //   },
//   // });
// // const transporter = nodemailer.createTransport({
// //   host:"smtp.gmail.com",
// // //   host: "smtp.privateemail.com",
// //   port: 587,
// //   secure: false,
// //   requireTLS: true,
// //   auth: {
// //     user: process.env.EMAIL_USER, 
// //     pass: process.env.EMAIL_PASS, 
 
// //   },
// //     tls: {
// //     rejectUnauthorized: false // Bypass SSL certificate validation
// //   }
// // });


//     // Email options - send from the user's email
//     // let mailOptions = {
//     //   from: email, // Use the sender's email
//     //   replyTo: email, // Set reply-to to the sender's email
//     //   to: process.env.EMAIL_USER, // your inbox
//     //   subject: subject || "No Subject",
//     //   text: `
//     //   Name: ${name || "Not provided"}
//     //   Email: ${email}
//     //   Message: ${message}
//     //   `,
//     //   html: `
//     //   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//     //     <h2 style="color: #00b894;">New Message from Portfolio Contact Form</h2>
//     //     <p><strong>Name:</strong> ${name || "Not provided"}</p>
//     //     <p><strong>Email:</strong> ${email}</p>
//     //     <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
//     //     <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
//     //       <p><strong>Message:</strong></p>
//     //       <p>${message.replace(/\n/g, '<br>')}</p>
//     //     </div>
//     //   </div>
//     //   `
//     // };



//     let mailOptions = {
//   from: email,
//   replyTo: email,
//   to: process.env.EMAIL_USER,
//   subject: subject || "Portfolio Contact: No Subject",
//   text: `
// Name: ${name || "Not provided"}
// Email: ${email}
// Subject: ${subject || "No Subject"}
// Time: ${new Date().toLocaleString()}
// Message: ${message}
//   `,
//   html: `
//   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background: #fafafa;">
//     <h2 style="color:#0984e3; text-align:center;">New Portfolio Message</h2>
//     <p><strong>Name:</strong> ${name || "Not provided"}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
//     <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//     <hr style="margin:20px 0;">
//     <h3 style="color:#00b894;">Message:</h3>
//     <p style="white-space:pre-line; line-height:1.6;">${message}</p>
//     <hr style="margin:20px 0;">
//     <p style="font-size:12px; color:#555; text-align:center;">This message was sent from your portfolio contact form</p>
//   </div>
//   `
// };


// //     let mailOptions = {
// //   from: email,
// //   replyTo: email,
// //   to: process.env.EMAIL_USER,
// //   subject: subject || "Portfolio Contact: No Subject",
// //   text: `
// // Name: ${name || "Not provided"}
// // Email: ${email}
// // Subject: ${subject || "No Subject"}
// // Time: ${new Date().toLocaleString()}
// // Message: ${message}
// //   `,
// //   html: `
// // <!DOCTYPE html>
// // <html>
// // <head>
// //   <meta charset="utf-8">
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //   <title>Portfolio Contact Message</title>
// //   <style>
// //     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
// //     * {
// //       margin: 0;
// //       padding: 0;
// //       box-sizing: border-box;
// //     }
    
// //     body {
// //       font-family: 'Poppins', sans-serif;
// //       background-color: #f8f9fa;
// //       color: #2d3436;
// //       line-height: 1.6;
// //       padding: 20px;
// //     }
    
// //     .email-container {
// //       max-width: 600px;
// //       margin: 0 auto;
// //       background-color: #ffffff;
// //       border-radius: 20px;
// //       box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
// //       overflow: hidden;
// //     }
    
// //     .email-header {
// //       background: linear-gradient(135deg, #0984e3, #00b894);
// //       padding: 30px;
// //       text-align: center;
// //       color: white;
// //     }
    
// //     .email-header h1 {
// //       font-size: 28px;
// //       font-weight: 700;
// //       margin-bottom: 10px;
// //     }
    
// //     .email-header p {
// //       font-size: 16px;
// //       opacity: 0.9;
// //     }
    
// //     .email-body {
// //       padding: 30px;
// //     }
    
// //     .message-info {
// //       margin-bottom: 25px;
// //     }
    
// //     .info-row {
// //       display: flex;
// //       margin-bottom: 12px;
// //       align-items: flex-start;
// //     }
    
// //     .info-label {
// //       font-weight: 600;
// //       color: #00b894;
// //       min-width: 80px;
// //       margin-right: 15px;
// //     }
    
// //     .info-value {
// //       flex: 1;
// //       color: #2d3436;
// //     }
    
// //     .message-content {
// //       background-color: #f8f9fa;
// //       padding: 25px;
// //       border-radius: 15px;
// //       border-left: 4px solid #00b894;
// //       margin-top: 20px;
// //     }
    
// //     .message-content h3 {
// //       color: #0984e3;
// //       margin-bottom: 15px;
// //       font-size: 18px;
// //       font-weight: 600;
// //     }
    
// //     .message-text {
// //       color: #2d3436;
// //       line-height: 1.7;
// //       white-space: pre-line;
// //     }
    
// //     .email-footer {
// //       background-color: #161b22;
// //       padding: 20px;
// //       text-align: center;
// //       color: #8b949e;
// //       font-size: 14px;
// //     }
    
// //     .email-footer a {
// //       color: #74b9ff;
// //       text-decoration: none;
// //     }
    
// //     .email-footer a:hover {
// //       text-decoration: underline;
// //     }
    
// //     @media (max-width: 600px) {
// //       .email-container {
// //         border-radius: 15px;
// //       }
      
// //       .email-header {
// //         padding: 20px;
// //       }
      
// //       .email-header h1 {
// //         font-size: 24px;
// //       }
      
// //       .email-body {
// //         padding: 20px;
// //       }
      
// //       .info-row {
// //         flex-direction: column;
// //         margin-bottom: 15px;
// //       }
      
// //       .info-label {
// //         margin-bottom: 5px;
// //         margin-right: 0;
// //       }
      
// //       .message-content {
// //         padding: 20px;
// //       }
// //     }
// //   </style>
// // </head>
// // <body>
// //   <div class="email-container">
// //     <div class="email-header">
// //       <h1>New Portfolio Message</h1>
// //       <p>Someone contacted you through your portfolio website</p>
// //     </div>
    
// //     <div class="email-body">
// //       <div class="message-info">
// //         <div class="info-row">
// //           <span class="info-label">Name:</span>
// //           <span class="info-value">${name || "Not provided"}</span>
// //         </div>
        
// //         <div class="info-row">
// //           <span class="info-label">Email:</span>
// //           <span class="info-value">${email}</span>
// //         </div>
        
// //         <div class="info-row">
// //           <span class="info-label">Subject:</span>
// //           <span class="info-value">${subject || "No Subject"}</span>
// //         </div>
        
// //         <div class="info-row">
// //           <span class="info-label">Time:</span>
// //           <span class="info-value">${new Date().toLocaleString()}</span>
// //         </div>
// //       </div>
      
// //       <div class="message-content">
// //         <h3>Message Content</h3>
// //         <div class="message-text">${message}</div>
// //       </div>
// //     </div>
    
// //     <div class="email-footer">
// //       <p>This message was sent from your portfolio contact form</p>
// //       <p>© ${new Date().getFullYear()} Mohd Saif Khan Portfolio</p>
// //     </div>
// //   </div>
// // </body>
// // </html>
// //   `
// // };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Failed to send message." });
//   }
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));









