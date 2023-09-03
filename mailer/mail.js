const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "mail.renga.tech", // Your SMTP server host (e.g., "smtp.gmail.com" for Gmail)
  port: 26, // Port for SMTP (587 for TLS, 465 for SSL)
  secure: false, // Set to true for SSL (465), false for TLS (587)
  auth: {
    user: "collins.kiptoo@renga.tech", // Your SMTP username
    pass: "#Collins12#", // Your SMTP password
  },
  tls: {
    rejectUnauthorized: false, // Bypass certificate validation (not recommended for production)
  },
});

module.exports = transporter;
