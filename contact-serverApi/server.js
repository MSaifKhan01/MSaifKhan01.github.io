



const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();



const allowedOrigins = [
  "http://127.0.0.1:5500/index3.html",
  "https://msaifkhan01.github.io",   // GitHub Pages
  "http://127.0.0.1:5500"            // Local frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
  console.log("====req.body====",req.body)
  console.log("==========",process.env.EMAIL_USER, process.env.EMAIL_PASS)

  try {
    // // // Transporter setup for Gmail
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });








  
    await transporter.sendMail({
      from: `"Portfolio Contact" <${email}>`,
      to: process.env.EMAIL_USER,

      subject: subject || "Portfolio Contact: No Subject",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Contact Message</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f8f9fa;
      color: #2d3436;
      line-height: 1.6;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .email-header {
      background: linear-gradient(135deg, #0984e3, #00b894);
      padding: 30px;
      text-align: center;
      color: white;
    }
    
    .email-header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .email-header p {
      font-size: 16px;
      opacity: 0.9;
    }
    
    .email-body {
      padding: 30px;
    }
    
    .message-info {
      margin-bottom: 25px;
    }
    
    .info-row {
      display: flex;
      margin-bottom: 12px;
      align-items: flex-start;
    }
    
    .info-label {
      font-weight: 600;
      color: #00b894;
      min-width: 80px;
      margin-right: 15px;
    }
    
    .info-value {
      flex: 1;
      color: #2d3436;
    }
    
    .message-content {
      background-color: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
      border-left: 4px solid #00b894;
      margin-top: 20px;
    }
    
    .message-content h3 {
      color: #0984e3;
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 600;
    }
    
    .message-text {
      color: #2d3436;
      line-height: 1.7;
      white-space: pre-line;
    }
    
    .email-footer {
      background-color: #161b22;
      padding: 20px;
      text-align: center;
      color: #8b949e;
      font-size: 14px;
    }
    
    .email-footer a {
      color: #74b9ff;
      text-decoration: none;
    }
    
    .email-footer a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 600px) {
      .email-container {
        border-radius: 15px;
      }
      
      .email-header {
        padding: 20px;
      }
      
      .email-header h1 {
        font-size: 24px;
      }
      
      .email-body {
        padding: 20px;
      }
      
      .info-row {
        flex-direction: column;
        margin-bottom: 15px;
      }
      
      .info-label {
        margin-bottom: 5px;
        margin-right: 0;
      }
      
      .message-content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>New Portfolio Message</h1>
      <p>Someone contacted you through your portfolio website</p>
    </div>
    
    <div class="email-body">
      <div class="message-info">
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${name || "Not provided"}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${email}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">Subject:</span>
          <span class="info-value">${subject || "No Subject"}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">Time:</span>
          <span class="info-value">${new Date().toLocaleString()}</span>
        </div>
      </div>
      
      <div class="message-content">
        <h3>Message Content</h3>
        <div class="message-text">${message}</div>
      </div>
    </div>
    
    <div class="email-footer">
      <p>This message was sent from your portfolio contact form</p>
      <p>© ${new Date().getFullYear()} Mohd Saif Khan Portfolio</p>
    </div>
  </div>
</body>
</html>
  `
    });
    console.log("Mail sent successfully");


    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));













// const express = require("express");
// const sgMail = require("@sendgrid/mail");
// const cors = require("cors");
// require("dotenv").config();  // this alone is enough

// const app = express();
// app.use(cors());
// app.use(express.json());

// // set API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// // POST /send-email
// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!email || !message) {
//     return res.status(400).json({ message: "Email and message are required." });
//   }

//   try {
//     // keep your full HTML template (line breaks converted)
//     const mailHtml = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Portfolio Contact Message</title>
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Poppins', sans-serif; background-color: #f8f9fa; color: #2d3436; line-height: 1.6; padding: 20px; }
//     .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); overflow: hidden; }
//     .email-header { background: linear-gradient(135deg,#0984e3,#00b894); padding: 30px; text-align:center; color:white; }
//     .email-header h1 { font-size:28px; font-weight:700; margin-bottom:10px; }
//     .email-header p { font-size:16px; opacity:0.9; }
//     .email-body { padding:30px; }
//     .message-info { margin-bottom:25px; }
//     .info-row { display:flex; margin-bottom:12px; align-items:flex-start; }
//     .info-label { font-weight:600; color:#00b894; min-width:80px; margin-right:15px; }
//     .info-value { flex:1; color:#2d3436; }
//     .message-content { background-color:#f8f9fa; padding:25px; border-radius:15px; border-left:4px solid #00b894; margin-top:20px; }
//     .message-content h3 { color:#0984e3; margin-bottom:15px; font-size:18px; font-weight:600; }
//     .message-text { color:#2d3436; line-height:1.7; white-space:pre-line; }
//     .email-footer { background-color:#161b22; padding:20px; text-align:center; color:#8b949e; font-size:14px; }
//     .email-footer a { color:#74b9ff; text-decoration:none; }
//     @media (max-width:600px) {
//       .email-container { border-radius:15px; }
//       .email-header { padding:20px; }
//       .email-header h1 { font-size:24px; }
//       .email-body { padding:20px; }
//       .info-row { flex-direction:column; margin-bottom:15px; }
//       .info-label { margin-bottom:5px; margin-right:0; }
//       .message-content { padding:20px; }
//     }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//     <div class="email-header">
//       <h1>New Portfolio Message</h1>
//       <p>Someone contacted you through your portfolio website</p>
//     </div>
//     <div class="email-body">
//       <div class="message-info">
//         <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${name || "Not provided"}</span></div>
//         <div class="info-row"><span class="info-label">Email:</span><span class="info-value">${email}</span></div>
//         <div class="info-row"><span class="info-label">Subject:</span><span class="info-value">${subject || "No Subject"}</span></div>
//         <div class="info-row"><span class="info-label">Time:</span><span class="info-value">${new Date().toLocaleString()}</span></div>
//       </div>
//       <div class="message-content">
//         <h3>Message Content</h3>
//         <div class="message-text">${(message || "").replace(/\n/g, "<br>")}</div>
//       </div>
//     </div>
//     <div class="email-footer">
//       <p>This message was sent from your portfolio contact form</p>
//       <p>© ${new Date().getFullYear()} Mohd Saif Khan Portfolio</p>
//     </div>
//   </div>
// </body>
// </html>`;

//     const msg = {
//       to: process.env.EMAIL_USER,                    // recipient (your inbox)
//       from: process.env.SENDGRID_VERIFIED_SENDER,    // verified sender in SendGrid
//       replyTo: email,                                // reply goes to visitor
//       subject: subject || "Portfolio Contact: No Subject",
//       text: `Name: ${name || "Not provided"}\nEmail: ${email}\nSubject: ${subject || "No Subject"}\nTime: ${new Date().toLocaleString()}\n\nMessage:\n${message}`,
//       html: mailHtml
//     };

//     await sgMail.send(msg);
//     return res.status(200).json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("SendGrid error:", error);
//     if (error.response && error.response.body) {
//       console.error("SendGrid response body:", error.response.body);
//     }
//     return res.status(500).json({ success: false, message: "Failed to send message." });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
