const nodemailer = require("nodemailer");
const transporter = require("./mail"); // Import your Nodemailer transporter

function sendMail(email, confirmationCode) {
  const mailOptions = {
    from: "collins.kiptoo@renga.tech", // Sender's email address
    to: email, // Recipient's email address (customer's email)
    subject: "Confirmation Code for Your Account",
    text: `Your confirmation code is: ${confirmationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return false;
    } else {
      console.log("Email sent:", info.response);
      return true;
    }
  });
}

module.exports = {
  sendMail,
};

